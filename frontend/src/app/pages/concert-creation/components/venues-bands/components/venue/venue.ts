import { Component, inject } from '@angular/core';
import { Venue } from '../../../../models/venues-bands.interfaces';
import { ConcertCreationService } from '../../../../concert-creatation.services';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-venue',
    imports: [FormsModule],
    templateUrl: './venue.html',
    styleUrl: './venue.css',
})
export class VenueComponent {
    filterVenues() {
        throw new Error('Method not implemented.');
    }
    selectedVenue: Venue | null = null;
    wantVenue: boolean = false;
    concertCreationService = inject(ConcertCreationService);

    venue = new Subject<Venue>();

    venues: Venue[] = [];
    filteredVenues: Venue[] = [];

    venueSearchTerm: string = '';
    venueFilters = {
        minPrice: null as number | null,
        maxPrice: null as number | null,
        capacity: '' as string,
        minRating: 0 as number,
    };

    ngOnInit() {
        this.concertCreationService.getVenues().subscribe((value) => {
                console.log(value);
        });
    }

    toggleVenueSection() {
        if (!this.wantVenue) {
            this.selectedVenue = null;
            this.updateService();
        }
    }

    updateService() {
        this.concertCreationService.update(2, {
            venue: this.selectedVenue,
        });
    }
}
