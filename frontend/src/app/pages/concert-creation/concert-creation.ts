import { Component, inject, signal } from '@angular/core';
import { BasicDetails } from './components/basic-details/basic-details';
import { CommonModule } from '@angular/common';
import { VenuesBands } from './components/venues-bands/venues-bands';
import { FormsModule } from '@angular/forms';
import { DecorationAddons } from './components/decoration-addons/decoration-addons';
import { DateChecking } from './components/date-checking/date-checking';
import { TicketingComponent } from './components/ticket-price/ticket-price';
import { BookingSummary } from './components/booking-summary/booking-summary';
import { ConcertCreationService } from './concert-creatation.services';
import { Payment } from './components/payment/payment';

@Component({
    selector: 'app-concert-creation',
    imports: [
        BasicDetails,
        CommonModule,
        VenuesBands,
        FormsModule,
        DecorationAddons,
        DateChecking,
        TicketingComponent,
        BookingSummary,
        Payment,
    ],
    templateUrl: './concert-creation.html',
    styleUrl: './concert-creation.css',
})
export class ConcertCreation {
    currStep = signal(1);

    concertCreationService = inject(ConcertCreationService);

    barTrackingMap: any = {
        1: true,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
    };

    bookingData = this.concertCreationService.data;
    

    hasAnyData(): boolean {
        const data = this.bookingData();
        return !!(
            data.step1 ||
            data.step2?.venue ||
            data.step2?.band ||
            data.step3?.decoration ||
            data.step3?.foodCost ||
            data.step5?.provideTickets
        );
    }

    getTotalCost(): number {
        const data = this.bookingData();
        let total = 0;

        if (data.step2?.venue?.price) total += data.step2.venue.price;
        if (data.step2?.band?.price) total += data.step2.band.price;
        if (data.step3?.decoration?.price) total += data.step3.decoration.price;
        if (data.step3?.foodCost) total += data.step3.foodCost;

        return total;
    }
    

    updateSummary(e: any) {
        console.error(e);
    }
    moveTo(step: number) {

        if (this.barTrackingMap[step] && step !== this.currStep()) {
            this.currStep.set(step);
        }
    }
    async nextStep(increment: number) {
        this.currStep.update((step) => step + increment);
        this.barTrackingMap[this.currStep()] = true;
    }

    previousStep(decrement: number) {
        this.currStep.update((step) => step + decrement);
       
    }
}
