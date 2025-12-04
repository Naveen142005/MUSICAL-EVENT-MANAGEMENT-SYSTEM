import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface TicketTypeView {
    name: string;
    maxCount: number;
    price: number;

    // error messages per row
    nameError?: string;
    countError?: string;
    priceError?: string;
}

@Component({
    selector: 'app-ticket-price',
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './ticket-price.html',
    styleUrl: './ticket-price.css',
})
export class TicketingComponent implements OnInit {
    @Input() eventDate?: string; // ISO string from previous step (optional)

    provideTickets = false;

    totalTickets = 0;
    totalTicketsError = '';

    ticketTypesCount = 0;
    typesCountError = '';

    ticketTypes: TicketTypeView[] = [];

    ticketBookingDate = '';
    minBookingDate = '';
    bookingError = '';

    assignedError = '';

    ngOnInit(): void {
        this.setMinBookingDate();
    }

    isTicketTypeValid(t: TicketTypeView): any {
        return (
            t.name &&
            t.name.trim().length > 0 &&
            !t.nameError &&
            t.maxCount > 0 &&
            !t.countError &&
            t.price > 0 &&
            !t.priceError
        );
    }

    isTicketTypeInvalid(t: TicketTypeView): boolean {
        return !!(t.nameError || t.countError || t.priceError);
    }

    private setMinBookingDate(): void {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 1);
        this.minBookingDate = now.toISOString().slice(0, 16);
    }

    onProvideTicketsChange(): void {
        if (!this.provideTickets) {
            this.resetAll();
        }
    }

    onTotalTicketsChange(): void {
        this.totalTicketsError = '';

        if (!this.totalTickets || this.totalTickets <= 0) {
            this.totalTicketsError = 'Total tickets must be at least 1.';
            return;
        }

        if (this.totalTickets > 100000) {
            this.totalTicketsError = 'Total tickets cannot exceed 100,000.';
            return;
        }

        // Re-check assigned total
        this.validateAssignedTotal();
    }

    onTicketTypesCountChange(val: number): void {
        this.typesCountError = '';

        if (!val || val < 1) {
            this.ticketTypesCount = 0;
            this.ticketTypes = [];
            return;
        }

        if (val > 5) {
            this.ticketTypesCount = 5;
            this.typesCountError = 'Maximum 5 ticket types allowed.';
        } else {
            this.ticketTypesCount = val;
        }

        this.buildTicketTypes();
    }

    private buildTicketTypes(): void {
        const current = this.ticketTypes.length;
        const target = this.ticketTypesCount;

        if (target > current) {
            // add new rows
            for (let i = current; i < target; i++) {
                this.ticketTypes.push({
                    name: '',
                    maxCount: 0,
                    price: 0,
                });
            }
        } else if (target < current) {
            // remove extra rows
            this.ticketTypes = this.ticketTypes.slice(0, target);
        }

        this.validateAssignedTotal();
    }

    splitEqually(): void {
        if (!this.totalTickets || this.ticketTypes.length === 0) {
            return;
        }

        const n = this.ticketTypes.length;
        const base = Math.floor(this.totalTickets / n);
        let remainder = this.totalTickets % n;

        this.ticketTypes.forEach((t) => {
            const extra = remainder > 0 ? 1 : 0;
            t.maxCount = base + extra;
            remainder--;
            t.countError = '';
        });

        this.validateAssignedTotal();
    }

    clearTypeErrors(index: number): void {
        const t = this.ticketTypes[index];
        if (t) {
            t.nameError = '';
            t.priceError = '';
        }
    }

    onTypeCountChange(index: number): void {
        const t = this.ticketTypes[index];
        if (t) {
            t.countError = '';

            if (t.maxCount === null || t.maxCount === undefined) {
                t.countError = 'Max tickets is required.';
            } else if (t.maxCount < 0) {
                t.countError = 'Cannot be negative.';
            }
        }

        this.validateAssignedTotal();
    }

    validateAssignedTotal(): void {
        this.assignedError = '';

        if (!this.totalTickets || this.ticketTypes.length === 0) {
            return;
        }

        const assigned = this.getAssignedTotal();

        if (assigned > this.totalTickets) {
            this.assignedError = 'Assigned tickets exceed total tickets.';
        } else if (assigned < this.totalTickets) {
            this.assignedError = 'Assigned tickets are less than total tickets.';
        }
    }

    getAssignedTotal(): number {
        return this.ticketTypes.reduce((sum, t) => sum + (t.maxCount || 0), 0);
    }

    onBookingDateChange(): void {
        this.bookingError = '';

        if (!this.ticketBookingDate) {
            return;
        }

        const selected = new Date(this.ticketBookingDate);
        const now = new Date();

        if (selected <= now) {
            this.bookingError = 'Booking date must be in the future.';
            return;
        }

        if (this.eventDate) {
            const eventD = new Date(this.eventDate);
            if (selected >= eventD) {
                this.bookingError = 'Booking date must be before the event date.';
            }
        }
    }

    onNextClick(): void {
        // Clear all previous errors
        this.totalTicketsError = '';
        this.typesCountError = '';
        this.assignedError = '';
        this.bookingError = '';

        this.ticketTypes.forEach((t) => {
            t.nameError = '';
            t.countError = '';
            t.priceError = '';
        });

        // Run full validation
        if (!this.validate()) {
            return;
        }

        // Valid - prepare payload
        const payload = {
            provideTickets: this.provideTickets,
            totalTickets: this.totalTickets,
            ticketTypes: this.ticketTypes.map((t) => ({
                name: t.name,
                maxCount: t.maxCount,
                price: t.price,
            })),
            ticketBookingDate: this.ticketBookingDate,
        };

        console.log('✅ Form valid. Payload:', payload);
        // Move to next step here
    }

    private validate(): boolean {
        let isValid = true;

        // If not providing tickets, skip
        if (!this.provideTickets) {
            return true;
        }

        // Total tickets
        if (!this.totalTickets || this.totalTickets <= 0) {
            this.totalTicketsError = 'Total tickets is required and must be at least 1.';
            isValid = false;
        } else if (this.totalTickets > 100000) {
            this.totalTicketsError = 'Total tickets cannot exceed 100,000.';
            isValid = false;
        }

        // Ticket types count
        if (!this.ticketTypesCount || this.ticketTypesCount < 1) {
            this.typesCountError = 'Number of ticket types is required.';
            isValid = false;
        } else if (this.ticketTypesCount > 5) {
            this.typesCountError = 'Maximum 5 ticket types allowed.';
            isValid = false;
        }

        // Each ticket type
        if (this.ticketTypes.length === 0) {
            this.typesCountError = 'Please enter ticket types.';
            isValid = false;
        }

        this.ticketTypes.forEach((t, i) => {
            // Name
            if (!t.name || !t.name.trim()) {
                t.nameError = 'Type name is required.';
                isValid = false;
            } else if (t.name.trim().length > 50) {
                t.nameError = 'Type name cannot exceed 50 characters.';
                isValid = false;
            }

            // Check duplicate names
            const duplicates = this.ticketTypes.filter(
                (x) => x.name.trim().toLowerCase() === t.name.trim().toLowerCase()
            );
            if (duplicates.length > 1 && !t.nameError) {
                t.nameError = 'Duplicate type name.';
                isValid = false;
            }

            // Max count
            if (t.maxCount === null || t.maxCount === undefined) {
                t.countError = 'Max tickets is required.';
                isValid = false;
            } else if (t.maxCount < 0) {
                t.countError = 'Cannot be negative.';
                isValid = false;
            } else if (t.maxCount === 0) {
                t.countError = 'Must be at least 1.';
                isValid = false;
            }

            // Price
            if (!t.price || t.price <= 0) {
                t.priceError = 'Price is required and must be greater than 0.';
                isValid = false;
            } else if (t.price > 1000000) {
                t.priceError = 'Price cannot exceed ₹10,00,000.';
                isValid = false;
            }
        });

        // Assigned total must match
        const assigned = this.getAssignedTotal();
        if (assigned !== this.totalTickets) {
            if (assigned > this.totalTickets) {
                this.assignedError =
                    'Assigned tickets exceed total tickets. Use "Split equally" to fix.';
            } else {
                this.assignedError =
                    'Assigned tickets are less than total tickets. Use "Split equally" to fix.';
            }
            isValid = false;
        }

        // Booking date
        if (!this.ticketBookingDate) {
            this.bookingError = 'Ticket booking date is required.';
            isValid = false;
        } else {
            const selected = new Date(this.ticketBookingDate);
            const now = new Date();

            if (selected <= now) {
                this.bookingError = 'Booking date must be in the future.';
                isValid = false;
            }

            if (this.eventDate) {
                const eventD = new Date(this.eventDate);
                if (selected >= eventD) {
                    this.bookingError = 'Booking date must be before the event date.';
                    isValid = false;
                }
            }
        }

        return isValid;
    }

    goPrevious(): void {
        console.log('Go to previous step');
        // Wire to your stepper logic
    }

    private resetAll(): void {
        this.totalTickets = 0;
        this.totalTicketsError = '';
        this.ticketTypesCount = 0;
        this.typesCountError = '';
        this.ticketTypes = [];
        this.ticketBookingDate = '';
        this.bookingError = '';
        this.assignedError = '';
    }
}
