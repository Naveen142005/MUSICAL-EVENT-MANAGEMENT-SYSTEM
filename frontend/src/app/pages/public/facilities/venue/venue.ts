import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBar } from '../../../../shared/nav-bar/nav-bar';
import { FacilitiesService } from '../facilities.services';
import { environment } from '../../../../../environments/environment';
import { ModalService } from '../../../../shared/model/modal.service';
import { CheckAvailbility } from '../check-availbility/check-availbility';

@Component({
    selector: 'app-venue',
    imports: [NavBar, CommonModule, FormsModule],
    templateUrl: './venue.html',
    styleUrl: './venue.css',
})
export class Venue {
    venues: any[] = [];
    filteredVenues: any[] = [];
    displayedVenues: any[] = [];
    locations: any[] = [];
    venueTypes: any[] = [];

    showOrganizerButtons: any;
    currentOrganizerId: any;
    baseUrl = environment.apiBase;

    hasLoadItems: boolean = true;
    itemsCnt = 1;

    // Filter values
    selectedLocation = '';
    selectedCapacity = '';
    selectedType = '';
    selectedPrice = '';

    // Mobile filter visibility
    isMobileFilterOpen = false;

    constructor(private facilitiesService: FacilitiesService, private model: ModalService) {}

    async ngOnInit() {
        this.venues = await this.facilitiesService.getVenues();
        this.venues.forEach((item) => (item.image_path = this.baseUrl + '/' + item.image_path));

        this.currentOrganizerId = 1;
        this.showOrganizerButtons = 1;
        this.locations = [...new Set(this.venues.map((v) => v.location))].sort();
        this.venueTypes = [...new Set(this.venues.map((v) => v.type))].sort();

        this.filteredVenues = [...this.venues];

        console.log(this.venues);

        this.loadMore();
    }

    applyFilters() {
        this.filteredVenues = this.venues.filter((venue) => {
            // Location
            if (this.selectedLocation && venue.location !== this.selectedLocation) return false;

            // Capacity
            if (this.selectedCapacity) {
                if (this.selectedCapacity === 'small' && venue.capacity >= 500) return false;
                if (
                    this.selectedCapacity === 'medium' &&
                    (venue.capacity < 500 || venue.capacity >= 2000)
                )
                    return false;
                if (this.selectedCapacity === 'large' && venue.capacity < 2000) return false;
            }

            // Type
            if (this.selectedType && venue.type !== this.selectedType) return false;

            // Price
            if (this.selectedPrice) {
                if (this.selectedPrice === 'budget' && venue.price >= 50000) return false;
                if (
                    this.selectedPrice === 'premium' &&
                    (venue.price < 50000 || venue.price >= 200000)
                )
                    return false;
                if (this.selectedPrice === 'luxury' && venue.price < 200000) return false;
            }

            return true;
        });

        // Reset pagination
        this.itemsCnt = 1;
        this.loadMore();
    }

    loadMore() {
        this.itemsCnt += 9;
        if (this.itemsCnt % 2 == 1) this.itemsCnt -= 1;
        if (this.filteredVenues.length <= this.itemsCnt) this.hasLoadItems = false;
        else this.hasLoadItems = true;

        console.log(this.itemsCnt, this.filteredVenues.length);
        this.displayedVenues = this.filteredVenues.slice(0, this.itemsCnt);
    }

    clearFilters() {
        this.selectedLocation = '';
        this.selectedCapacity = '';
        this.selectedType = '';
        this.selectedPrice = '';
        this.applyFilters();
    }

    toggleMobileFilter() {
        this.isMobileFilterOpen = !this.isMobileFilterOpen;
    }

    closeMobileFilter() {
        this.isMobileFilterOpen = false;
    }

    checkAvailability(type: string, venueName: string, venueId: number) {
        this.model.open(CheckAvailbility, {
            type: 'venue',
            venueName: venueName, 
            venueId: venueId,
        });
    }
}
