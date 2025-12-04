import { CommonModule } from '@angular/common';
import {
    Component,
    inject,
    Output,
    EventEmitter,
    Input,
    input,
    effect,
    signal,
} from '@angular/core';
import { ConcertCreationService } from '../../concert-creatation.services';

@Component({
    selector: 'app-date-checking',
    imports: [CommonModule],
    templateUrl: './date-checking.html',
    styleUrl: './date-checking.css',
})
export class DateChecking {
    isActive = input<boolean>(false);

    constructor() {
        effect(() => {
            if (this.isActive()) {
                this.callWhenLoaded();
            }
        });
    }

    @Output() next = new EventEmitter<number>();
    @Output() previous = new EventEmitter<number>();
    @Output() summary = new EventEmitter<any>();

    calendar: {
        day: number;
        date: string;
        isPast: boolean;
        isAvailable: boolean;
    }[][] = [];

    availableDates: any = [];
    nxtDisabled = false;
    prevDisabled = true;
    currMonth: number = 0;
    today = new Date();
    data: any;
    currYear: number = 0;
    monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    concertCreationService = inject(ConcertCreationService);

    async callWhenLoaded() {
        this.data = this.concertCreationService.getAll();
        this.currMonth = this.today.getMonth();
        this.currYear = this.today.getFullYear();
        this.availableDates = await this.concertCreationService.getAvailableDates();
        console.log(this.availableDates);

        this.generateCalendar(this.today.getMonth(), this.today.getFullYear());
    }

    generateCalendar(month: number, year: number) {
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        let cnt = 1;

        this.calendar = Array.from({ length: 6 }, () =>
            Array.from({ length: 7 }, () => ({
                day: 0,
                date: '',
                isPast: false,
                isAvailable: false,
            }))
        );

        const isPastDate = (d: number) => {
            const full = new Date(year, month, d);
            return (
                full <
                new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())
            );
        };

        // First week
        for (let j = firstDay; j < 7 && cnt <= totalDays; j++) {
            const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(cnt).padStart(
                2,
                '0'
            )}`;

            this.calendar[0][j] = {
                day: cnt,
                date: fullDate,
                isPast: isPastDate(cnt),
                isAvailable: this.checkAvailable(fullDate),
            };
            cnt++;
        }

        // Remaining weeks
        for (let i = 1; i < 6 && cnt <= totalDays; i++) {
            for (let j = 0; j < 7 && cnt <= totalDays; j++) {
                const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(
                    cnt
                ).padStart(2, '0')}`;

                this.calendar[i][j] = {
                    day: cnt,
                    date: fullDate,
                    isPast: isPastDate(cnt),
                    isAvailable: this.checkAvailable(fullDate),
                };
                cnt++;
            }
        }

        console.log(this.calendar);
    }

    checkAvailable(date: string) {
        const bookedFacilities = this.availableDates[date];

        if (!bookedFacilities) {
            return true; // Date has no bookings, all available
        }

        const venueId = this.data['step2']?.venue?.id;
        const bandId = this.data['step2']?.band?.id;
        const decorationId = this.data['step3']?.decoration?.id;

        const isVenueBooked = venueId && bookedFacilities.venue_ids.includes(venueId);
        const isBandBooked = bandId && bookedFacilities.band_ids.includes(bandId);
        const isDecorationBooked =
            decorationId && bookedFacilities.decoration_ids.includes(decorationId);

        return !isVenueBooked && !isBandBooked && !isDecorationBooked;
    }

    selectedDate = signal('');
    selectDate(arg0: string) {
        this.concertCreationService.update(4, { event_date: arg0 });
        this.selectedDate.set(arg0);
        console.log('see' + this.selectedDate());

        console.log(this.concertCreationService.getAll());
    }

    // In component
    getClassForCell(cell: any): string {
        if (cell.date === this.selectedDate()) {
            return 'bg-purple-600 text-white border-purple-700 cursor-pointer';
        }
        if (cell.isAvailable) {
            return 'bg-green-400 hover:bg-green-200 border-green-300 hover:border-green-400 hover:shadow-md cursor-pointer';
        }
        return 'bg-red-100 text-red-400 border-red-200 cursor-not-allowed opacity-60';
    }

    nextMonth() {
        this.prevDisabled = false;
        const max = new Date(this.today.getFullYear() + 1, this.today.getMonth(), 1);

        const next = new Date(this.currYear, this.currMonth + 1, 1);

        // If going beyond max → block it
        if (next > max) {
            this.nxtDisabled = true;
            return;
        }

        this.currMonth += 1;

        if (this.currMonth > 11) {
            this.currMonth = 0;
            this.currYear += 1;
        }

        this.generateCalendar(this.currMonth, this.currYear);
    }
    prevMonth() {
        
        const thisMonth = this.today.getMonth();
        const thisYear = this.today.getFullYear();

     
        if (this.currYear === thisYear && this.currMonth === thisMonth) {
            this.prevDisabled = true;
            return;
        }

       
        if (this.currMonth === 0) {
            this.currMonth = 11;
            this.currYear--;
        } else {
            this.currMonth--;
        }

        
        if (this.currYear === thisYear && this.currMonth === thisMonth) {
            this.prevDisabled = true;
        } else {
            this.prevDisabled = false;
        }

        this.generateCalendar(this.currMonth, this.currYear);
    }
}
