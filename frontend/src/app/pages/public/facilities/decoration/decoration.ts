import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBar } from '../../../../shared/nav-bar/nav-bar';
import { FacilitiesService } from '../facilities.services';
import { environment } from '../../../../../environments/environment';
import { ModalService } from '../../../../shared/model/modal.service';
import { CheckAvailbility } from '../check-availbility/check-availbility';

@Component({
    selector: 'app-decoration',
    imports: [NavBar, CommonModule, FormsModule],
    templateUrl: './decoration.html',
    styleUrl: './decoration.css',
})
export class Decoration {
    decorations: any[] = [];
    filteredDecorations: any[] = [];
    displayedDecorations: any[] = [];
    themes: any[] = [];
    styles: any[] = [];

    showOrganizerButtons: any;
    currentOrganizerId: any;
    baseUrl = environment.apiBase;

    hasLoadItems: boolean = true;
    itemsCnt = 1;

    // Filter values
    selectedTheme = '';
    selectedStyle = '';
    selectedPrice = '';

    // Mobile filter visibility
    isMobileFilterOpen = false;

    constructor(private facilitiesService: FacilitiesService, private model: ModalService) {}

    async ngOnInit() {
        this.decorations = await this.facilitiesService.getDecorations();
        
        // Process data and add defaults
        this.decorations.forEach((item) => {
            // Handle image
            item.image_path = item.image_path 
                ? this.baseUrl + '/' + item.image_path 
                : 'assets/default-decoration.jpg';
            
            // Map type to theme for display
            item.theme = item.type || 'Standard';
            
            // Generate rating between 4.0-5.0 if not provided
            item.rating = item.rating || (Math.random() * (5 - 4) + 4).toFixed(1);
            
            // Default description based on name
            item.description = item.description || `Beautiful ${item.name} decoration package for your event`;
            
            // Default style if not provided
            item.style = item.style || 'Modern';
            
            // Parse package_includes if it's a string, otherwise use defaults
            if (typeof item.package_includes === 'string') {
                item.package_includes = item.package_includes.split(',').map((s: string) => s.trim());
            } else if (!item.package_includes) {
                // Default package features based on price
                if (item.price < 15000) {
                    item.package_includes = ['Basic lighting', 'Stage setup', 'Backdrop', 'Seating arrangement'];
                } else if (item.price < 40000) {
                    item.package_includes = ['Mood lighting', 'Premium seating', 'Bar setup', 'Acoustic panels', 'Photo booth'];
                } else {
                    item.package_includes = ['LED walls', 'Premium lighting', 'VIP lounge', 'Bar setup', 'Stage design', 'Sound system'];
                }
            }
        });

        this.currentOrganizerId = 1;
        this.showOrganizerButtons = 1;
        
        // Extract unique themes (from type) and styles
        this.themes = [...new Set(this.decorations.map((d) => d.type))].filter(Boolean).sort();
        this.styles = [...new Set(this.decorations.map((d) => d.style))].filter(Boolean).sort();

        this.filteredDecorations = [...this.decorations];

        console.log('Decorations loaded:', this.decorations);

        this.loadMore();
    }

    applyFilters() {
        this.filteredDecorations = this.decorations.filter((decoration) => {
            // Theme (using type field)
            if (this.selectedTheme && decoration.type !== this.selectedTheme) return false;

            // Style
            if (this.selectedStyle && decoration.style !== this.selectedStyle) return false;

            // Price
            if (this.selectedPrice) {
                if (this.selectedPrice === 'budget' && decoration.price >= 15000) return false;
                if (
                    this.selectedPrice === 'premium' &&
                    (decoration.price < 15000 || decoration.price >= 40000)
                )
                    return false;
                if (this.selectedPrice === 'luxury' && decoration.price < 40000) return false;
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
        if (this.filteredDecorations.length <= this.itemsCnt) this.hasLoadItems = false;
        else this.hasLoadItems = true;

        console.log(this.itemsCnt, this.filteredDecorations.length);
        this.displayedDecorations = this.filteredDecorations.slice(0, this.itemsCnt);
    }

    clearFilters() {
        this.selectedTheme = '';
        this.selectedStyle = '';
        this.selectedPrice = '';
        this.applyFilters();
    }

    toggleMobileFilter() {
        this.isMobileFilterOpen = !this.isMobileFilterOpen;
    }

    closeMobileFilter() {
        this.isMobileFilterOpen = false;
    }

    checkAvailability(type: string, decorationName: string, decorationId: number) {
        this.model.open(CheckAvailbility, {
            type: 'decoration',
            venueName: decorationName,
            venueId: decorationId,
        });
    }
}
