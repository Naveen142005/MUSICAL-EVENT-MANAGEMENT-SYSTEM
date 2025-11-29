import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../../../../shared/model/modal.service';
import { FacilitiesService } from '../facilities.services';
import { extractErrorMessage } from '../../../../shared/utils/error-execter';

@Component({
    selector: 'app-check-availbility',
    imports: [CommonModule, FormsModule],
    templateUrl: './check-availbility.html',
    styleUrl: './check-availbility.css',
})
export class CheckAvailbility {
    @Input() venueName: string = '';
    @Input() venueId: number = 0;

    selectedDate: string = '';
    selectedSlot: string = '';
    isLoading: boolean = false;
    availabilityResult: any = null;
    errorMessage: string = '';

    ngOnInit() {
        console.log('Modal initialized with:', {
            venueName: this.venueName,
            venueId: this.venueId,
        });
    }

    constructor(private model: ModalService, private facilitiesService: FacilitiesService) {}

    close() {
        this.model.close();
    }

    async checkAvailability() {
        if (!this.selectedDate || !this.selectedSlot) {
            this.errorMessage = 'Please select both date and time slot';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        this.availabilityResult = null;

        try {
            const result = await this.facilitiesService.checkAvailability({
                id: this.venueId,
                facilityName: 'venue',
                date: this.selectedDate,
                slot: this.selectedSlot,
            });

            this.availabilityResult = result;
            console.log('Availability result:', result);
        } catch (error: any) {
            this.errorMessage = extractErrorMessage(error)
            console.log(this.errorMessage);
            
        } finally {
            this.isLoading = false;
        }
    }
}
