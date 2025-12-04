import { Component, inject, signal } from '@angular/core';
import { BasicDetails } from './components/basic-details/basic-details';
import { CommonModule } from '@angular/common';
import { VenuesBands } from './components/venues-bands/venues-bands';
import { FormsModule } from '@angular/forms';
import { DecorationAddons } from './decoration-addons/decoration-addons';
import { DateChecking } from './components/date-checking/date-checking';
import { TicketingComponent } from "./components/ticket-price/ticket-price";

@Component({
    selector: 'app-concert-creation',
    imports: [BasicDetails, CommonModule, VenuesBands, FormsModule, DecorationAddons, DateChecking, TicketingComponent],
    templateUrl: './concert-creation.html',
    styleUrl: './concert-creation.css',
})
export class ConcertCreation {
    currStep = signal(1);
    

    updateSummary(e: any) {
        console.error(e);
    }

    async nextStep(increment: number) {
        this.currStep.update((step) => step + increment);
    }

    previousStep(decrement: number) {
        this.currStep.update((step) => step + decrement);
    }
}
