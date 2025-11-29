import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBar } from '../../../../shared/nav-bar/nav-bar';
import { FacilitiesService } from '../facilities.services';
import { environment } from '../../../../../environments/environment';
import { ModalService } from '../../../../shared/model/modal.service';
import { CheckAvailbility } from '../check-availbility/check-availbility';

@Component({
    selector: 'app-band',
    imports: [NavBar, CommonModule, FormsModule],
    templateUrl: './band.html',
    styleUrl: './band.css',
})
export class Band {
    bands: any[] = [];
    filteredBands: any[] = [];
    displayedBands: any[] = [];
    genres: any[] = [];

    showOrganizerButtons: any;
    currentOrganizerId: any;
    baseUrl = environment.apiBase;

    hasLoadItems: boolean = true;
    itemsCnt = 1;

    // Filter values
    selectedGenre = '';
    selectedMembers = '';
    selectedPrice = '';

    // Mobile filter visibility
    isMobileFilterOpen = false;

    constructor(private facilitiesService: FacilitiesService, private model: ModalService) {}

    async ngOnInit() {
        this.bands = await this.facilitiesService.getBands();
        
        // Add default values and process images
        this.bands.forEach((item) => {
            item.image_path = item.image_path ? this.baseUrl + '/' + item.image_path : 'assets/default-band.jpg';
            item.rating = item.rating || (Math.random() * (5 - 4) + 4).toFixed(1); // Random rating 4.0-5.0
            item.description = item.description || 'Professional musical band for your special events';
            item.member_count = item.member_count || Math.floor(Math.random() * 8) + 3; // Random 3-10 members
        });

        this.currentOrganizerId = 1;
        this.showOrganizerButtons = 1;
        this.genres = [...new Set(this.bands.map((b) => b.genre))].sort();

        this.filteredBands = [...this.bands];

        console.log(this.bands);

        this.loadMore();
    }

    applyFilters() {
        this.filteredBands = this.bands.filter((band) => {
            
            if (this.selectedGenre && band.genre !== this.selectedGenre) return false;

           
            if (this.selectedMembers) {
                const memberCount = band.member_count || 5;
                if (this.selectedMembers === 'small' && memberCount > 5) return false;
                if (
                    this.selectedMembers === 'medium' &&
                    (memberCount < 6 || memberCount > 10)
                )
                    return false;
                if (this.selectedMembers === 'large' && memberCount <= 10) return false;
            }

            // Price
            if (this.selectedPrice) {
                if (this.selectedPrice === 'budget' && band.price >= 10000) return false;
                if (
                    this.selectedPrice === 'premium' &&
                    (band.price < 10000 || band.price >= 30000)
                )
                    return false;
                if (this.selectedPrice === 'luxury' && band.price < 30000) return false;
            }

            return true;
        });


        this.itemsCnt = 1;
        this.loadMore();
    }

    loadMore() {
        this.itemsCnt += 9;
        if (this.itemsCnt % 2 == 1) this.itemsCnt -= 1;
        if (this.filteredBands.length <= this.itemsCnt) this.hasLoadItems = false;
        else this.hasLoadItems = true;

        console.log(this.itemsCnt, this.filteredBands.length);
        this.displayedBands = this.filteredBands.slice(0, this.itemsCnt);
    }

    clearFilters() {
        this.selectedGenre = '';
        this.selectedMembers = '';
        this.selectedPrice = '';
        this.applyFilters();
    }

    toggleMobileFilter() {
        this.isMobileFilterOpen = !this.isMobileFilterOpen;
    }

    closeMobileFilter() {
        this.isMobileFilterOpen = false;
    }

    checkAvailability(type: string, bandName: string, bandId: number) {
        this.model.open(CheckAvailbility, {
            type: 'band',
            venueName: bandName,
            venueId: bandId,
        });
    }
}
