import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ConcertCreationService } from '../../concert-creatation.services';
import { DatePipe, JsonPipe, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-booking-summary',
    imports: [JsonPipe, DatePipe, DecimalPipe],
    templateUrl: './booking-summary.html',
    styleUrl: './booking-summary.css',
})
export class BookingSummary {
    concertCreationService = inject(ConcertCreationService);
    bookingData: any = this.concertCreationService.getAll();
    
    @Output() change_step = new EventEmitter<number>();
    
    showStep(step: number) {
        this.change_step.emit(step);
    }
    
    calculateTotal(): number {
        let total = 0;
        
        
        if (this.bookingData?.step2?.venue?.price) {
            total += this.bookingData.step2.venue.price;
        }
        
       
        if (this.bookingData?.step2?.band?.price) {
            total += this.bookingData.step2.band.price;
        }
        

        if (this.bookingData?.step3?.decoration?.price) {
            total += this.bookingData.step3.decoration.price;
        }
        

        if (this.bookingData?.step3?.foodCost) {
            total += this.bookingData.step3.foodCost;
        }
        
        return total;
    }
    
    proceedToPayment() {
        const total = this.calculateTotal();
        
        if (total === 0) {
            alert('Please select at least one service before proceeding to payment.');
            return;
        }
        
        this.change_step.emit(7);
        
       
        console.log('Total Amount:', total);
        console.log('Booking Data:', this.bookingData);
    }
}
