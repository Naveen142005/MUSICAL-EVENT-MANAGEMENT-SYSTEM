import { Component, inject, Output, EventEmitter, signal, computed } from '@angular/core';
import { ConcertCreationService } from '../concert-creatation.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Decoration, Snack } from '../models/decortions.interface';

@Component({
    selector: 'app-decoration-addons',
    imports: [CommonModule, FormsModule],
    templateUrl: './decoration-addons.html',
    styleUrl: './decoration-addons.css',
})
export class DecorationAddons {
    @Output() next = new EventEmitter<number>();
    @Output() previous = new EventEmitter<number>();
    @Output() summary = new EventEmitter<any>();

    concertCreationService = inject(ConcertCreationService);

    // Decoration Properties
    decorations: Decoration[] = [];
    filteredDecorations: Decoration[] = [];
    selectedDecoration: Decoration | null = null;
    wantDecoration: boolean = false;
    decorationSearchTerm: string = '';
    decorationFilters = {
        minPrice: null as number | null,
        maxPrice: null as number | null,
        packageType: '' as string,
        minRating: 0 as number,
    };

    // Food Properties with Signals
    wantFood: boolean = false;
    snackBoxes: Snack[] = [];
    selectedSnackBoxId = signal<number | null>(null);
    snackQuantity = signal<number>(0);

    // Computed signal for total food cost
    totalFoodCost = computed(() => {
        const boxId = this.selectedSnackBoxId();
        const quantity = this.snackQuantity();

        if (!boxId) return 0;

        const selectedBox = this.snackBoxes.find((box) => box.id === Number(boxId));
        if (!selectedBox) return 0;

        return selectedBox.price * quantity;
    });

    Math = Math;
    parseFloat = parseFloat;

    async ngOnInit() {
        // Load Decorations
        this.decorations = await this.concertCreationService.getDecorations();

        this.decorations = this.decorations.map((item: any) => ({
            ...item,
            rating: item.rating || this.generateRandomRating(),
            description:
                item.description || `Beautiful ${item.name} decoration package for your event`,
            package_includes: this.parsePackageIncludes(item),
        }));

        this.filteredDecorations = [...this.decorations];

        // Load Snack Boxes
        this.snackBoxes = await this.concertCreationService.getSnackBoxes();
        console.log('Snack boxes loaded:', this.snackBoxes);

        // Load previously saved data
    }

    parsePackageIncludes(item: any): string[] {
        if (typeof item.package_includes === 'string') {
            return item.package_includes.split(',').map((s: string) => s.trim());
        } else if (Array.isArray(item.package_includes)) {
            return item.package_includes;
        } else {
            if (item.price < 15000) {
                return ['Basic lighting', 'Stage setup', 'Backdrop', 'Seating arrangement'];
            } else if (item.price < 40000) {
                return [
                    'Mood lighting',
                    'Premium seating',
                    'Bar setup',
                    'Acoustic panels',
                    'Photo booth',
                ];
            } else {
                return [
                    'LED walls',
                    'Premium lighting',
                    'VIP lounge',
                    'Bar setup',
                    'Stage design',
                    'Sound system',
                ];
            }
        }
    }

    // Decoration methods
    toggleDecorationSection() {
        if (!this.wantDecoration) {
            this.selectedDecoration = null;
            this.updateService();
        }
    }

    selectDecoration(decoration: Decoration) {
        if (this.selectedDecoration?.id === decoration.id) {
            this.selectedDecoration = null;
        } else {
            this.selectedDecoration = decoration;
        }
        this.updateService();
    }

    isDecorationSelected(decorationId: number): boolean {
        return this.selectedDecoration?.id === decorationId;
    }

    filterDecorations() {
        this.filteredDecorations = this.decorations.filter((decoration) => {
            const searchLower = this.decorationSearchTerm.toLowerCase();
            const matchesSearch =
                !this.decorationSearchTerm ||
                decoration.name.toLowerCase().includes(searchLower) ||
                (decoration.package_type &&
                    decoration.package_type.toLowerCase().includes(searchLower)) ||
                (decoration.package_includes &&
                    decoration.package_includes.some((item: string) =>
                        item.toLowerCase().includes(searchLower)
                    ));

            const matchesMinPrice =
                !this.decorationFilters.minPrice ||
                decoration.price >= this.decorationFilters.minPrice;
            const matchesMaxPrice =
                !this.decorationFilters.maxPrice ||
                decoration.price <= this.decorationFilters.maxPrice;

            const matchesPackageType =
                !this.decorationFilters.packageType ||
                (decoration.package_type &&
                    decoration.package_type.toLowerCase() ===
                        this.decorationFilters.packageType.toLowerCase());

            const matchesRating =
                !decoration.rating ||
                parseFloat(decoration.rating) >= this.decorationFilters.minRating;

            return (
                matchesSearch &&
                matchesMinPrice &&
                matchesMaxPrice &&
                matchesPackageType &&
                matchesRating
            );
        });
    }

    // Food methods
    quantityError: string = '';
    toggleFoodSection() {
        if (!this.wantFood) {
            this.selectedSnackBoxId.set(null);
            this.snackQuantity.set(0);
            this.updateService();
        }
    }

    onSnackBoxChange() {
        this.updateService();
    }

    updateSnackQuantity() {
        const currentQuantity = this.snackQuantity();
        this.quantityError = '';

        if (!currentQuantity || currentQuantity < 1 || isNaN(currentQuantity)) {
            this.quantityError = "Quantity can't be empty";
            return;
        }

        this.updateService();
    }

    getSelectedSnackBox(): Snack | null {
        const boxId = this.selectedSnackBoxId();
        if (!boxId) return null;
        return this.snackBoxes.find((box) => box.id === Number(boxId)) || null;
    }

    getSnackBoxLabel(snackBox: Snack): string {
        const snacksList = snackBox.snacks.join(', ');
        return `Snack Box ${snackBox.id} - ₹${snackBox.price.toLocaleString()} (${snacksList})`;
    }

    getTotalFoodCost(): number {
        return this.totalFoodCost();
    }

    // Navigation
    nextStep() {
        if (!this.snackQuantity() || this.snackQuantity() < 1) {
            this.quantityError = "Quantity can't be empty";
            return;
        }
        const data = {
            decoration: this.selectedDecoration,
            selectedSnackBoxId: this.selectedSnackBoxId(),
            snackQuantity: this.snackQuantity(),
            foodCost: this.totalFoodCost(),
        };

        this.concertCreationService.update(3, data);
        this.summary.emit({ step: 3, data: data });

        console.log('Step 3 completed:', data);
        this.next.emit(1);
    }

    previousStep() {
        const data = {
            decoration: this.selectedDecoration,
            selectedSnackBoxId: this.selectedSnackBoxId(),
            snackQuantity: this.snackQuantity(),
            foodCost: this.totalFoodCost(),
        };

        this.concertCreationService.update(3, data);
        this.previous.emit(-1);
    }

    updateService() {
        this.concertCreationService.update(3, {
            decoration: this.selectedDecoration,
            selectedSnackBoxId: this.selectedSnackBoxId(),
            snackQuantity: this.snackQuantity(),
            foodCost: this.totalFoodCost(),
        });
    }

    generateRandomRating(): string {
        return (Math.random() * (4.9 - 4.3) + 4.3).toFixed(1);
    }

    getPackageIcon(packageType: string): string {
        switch (packageType?.toLowerCase()) {
            case 'basic':
                return 'fa-box';
            case 'premium':
                return 'fa-gem';
            case 'luxury':
                return 'fa-crown';
            default:
                return 'fa-gift';
        }
    }
}
