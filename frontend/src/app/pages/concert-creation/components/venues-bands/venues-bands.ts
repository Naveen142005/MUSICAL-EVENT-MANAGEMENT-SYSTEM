import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ConcertCreationService } from '../../concert-creatation.services';
import { Venue, Band } from '../../models/venues-bands.interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-venues-bands',
    imports: [CommonModule, FormsModule],
    templateUrl: './venues-bands.html',
    styleUrl: './venues-bands.css',
})
export class VenuesBands {
    concertCreationService = inject(ConcertCreationService);
    @Output() next = new EventEmitter<number>();
    @Output() summary = new EventEmitter<any>();
    @Output() previous = new EventEmitter<number>();

    // Venue Properties
    venues: Venue[] = [];
    filteredVenues: Venue[] = [];
    selectedVenue: Venue | null = null;
    wantVenue: boolean = false;
    venueSearchTerm: string = '';
    venueFilters = {
        minPrice: null as number | null,
        maxPrice: null as number | null,
        capacity: '' as string,
        minRating: 0 as number,
    };

    // Band Properties
    bands: Band[] = [];
    filteredBands: Band[] = [];
    selectedBand: Band | null = null;
    wantBand: boolean = false;
    bandSearchTerm: string = '';
    bandFilters = {
        minPrice: null as number | null,
        maxPrice: null as number | null,
        genre: '' as string,
        minRating: 0 as number,
    };

    // Expose Math to template
    Math = Math;
    selectionError: string = '';

    async ngOnInit() {
        // Load Venues
        this.venues = await this.concertCreationService.getVenues();
        this.venues = this.venues.map((venue) => ({
            ...venue,
            rating: this.generateRandomRating(),
        }));
        this.filteredVenues = [...this.venues];

        // Load Bands
        this.bands = await this.concertCreationService.getBands();
        this.bands = this.bands.map((band) => ({
            ...band,
            rating: this.generateRandomRating(),
        }));
        this.filteredBands = [...this.bands];

        console.log('Venues loaded:', this.venues);
        console.log('Bands loaded:', this.bands);

        // Load previously saved data
    }

    // ============ VENUE METHODS ============

    toggleVenueSection() {
        if (!this.wantVenue) {
            this.selectedVenue = null;
            this.updateService();
        }
    }

    selectVenue(venue: Venue) {
        if (this.selectedVenue?.id === venue.id) {
            this.selectedVenue = null;
        } else {
            this.selectedVenue = venue;
        }
        this.updateService();
        console.log('Selected venue:', this.selectedVenue);
    }

    isVenueSelected(venueId: number): boolean {
        return this.selectedVenue?.id === venueId;
    }

    filterVenues() {
        this.filteredVenues = this.venues.filter((venue) => {
            const searchLower = this.venueSearchTerm.toLowerCase();
            const matchesSearch =
                !this.venueSearchTerm ||
                venue.name.toLowerCase().includes(searchLower) ||
                venue.location.toLowerCase().includes(searchLower) ||
                venue.capacity.toString().includes(searchLower);

            const matchesMinPrice =
                !this.venueFilters.minPrice || venue.price >= this.venueFilters.minPrice;
            const matchesMaxPrice =
                !this.venueFilters.maxPrice || venue.price <= this.venueFilters.maxPrice;

            let matchesCapacity = true;
            if (this.venueFilters.capacity) {
                const capacity = venue.capacity;
                switch (this.venueFilters.capacity) {
                    case '0-500':
                        matchesCapacity = capacity < 500;
                        break;
                    case '500-1500':
                        matchesCapacity = capacity >= 500 && capacity <= 1500;
                        break;
                    case '1500-2500':
                        matchesCapacity = capacity > 1500 && capacity <= 2500;
                        break;
                    case '2500+':
                        matchesCapacity = capacity > 2500;
                        break;
                }
            }

            const matchesRating = !venue.rating || venue.rating >= this.venueFilters.minRating;

            return (
                matchesSearch &&
                matchesMinPrice &&
                matchesMaxPrice &&
                matchesCapacity &&
                matchesRating
            );
        });

        console.log('Filtered venues:', this.filteredVenues.length);
    }

    // ============ BAND METHODS ============

    toggleBandSection() {
        if (!this.wantBand) {
            this.selectedBand = null;
            this.updateService();
        }
    }

    selectBand(band: Band) {
        if (this.selectedBand?.id === band.id) {
            this.selectedBand = null;
        } else {
            this.selectedBand = band;
        }
        this.updateService();
        console.log('Selected band:', this.selectedBand);
    }

    isBandSelected(bandId: number): boolean {
        return this.selectedBand?.id === bandId;
    }

    filterBands() {
        this.filteredBands = this.bands.filter((band) => {
            const searchLower = this.bandSearchTerm.toLowerCase();
            const matchesSearch =
                !this.bandSearchTerm ||
                band.name.toLowerCase().includes(searchLower) ||
                band.genre.toLowerCase().includes(searchLower) ||
                (band.member_count && band.member_count.toString().includes(searchLower));

            const matchesMinPrice =
                !this.bandFilters.minPrice || band.price >= this.bandFilters.minPrice;
            const matchesMaxPrice =
                !this.bandFilters.maxPrice || band.price <= this.bandFilters.maxPrice;

            const matchesGenre =
                !this.bandFilters.genre ||
                band.genre.toLowerCase() === this.bandFilters.genre.toLowerCase();

            const matchesRating = !band.rating || band.rating >= this.bandFilters.minRating;

            return (
                matchesSearch && matchesMinPrice && matchesMaxPrice && matchesGenre && matchesRating
            );
        });

        console.log('Filtered bands:', this.filteredBands.length);
    }

    // ============ SHARED METHODS ============

    updateService() {
        this.concertCreationService.update(2, {
            venue: this.selectedVenue,
            band: this.selectedBand,
        });
        console.log(this.concertCreationService.data);
    }

    generateRandomRating(): number {
        const ratings = [4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9];
        return ratings[Math.floor(Math.random() * ratings.length)];
    }

    // Add error property

    // Update nextStep method
    nextStep() {
        // Reset error
        this.selectionError = '';

        // Validate: At least one venue or band must be selected
        if (!this.selectedVenue && !this.selectedBand) {
            this.selectionError = 'Please select at least one venue or band to continue';

            // Scroll to top to show error
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                this.selectionError = '';
            }, 5000);
            return;
        }
        const data = {
            venue: this.selectedVenue,
            band: this.selectedBand,
        };
        

        this.concertCreationService.update(2, data);
        this.summary.emit({ step: 2, data: data });
        console.log('Step 2 completed:', data);
        this.next.emit(1);
        
    }
}
