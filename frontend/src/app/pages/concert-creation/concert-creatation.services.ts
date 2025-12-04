import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Band, Venue } from './models/venues-bands.interfaces';
import { firstValueFrom } from 'rxjs';
import { Decoration, Snack } from './models/decortions.interface';

@Injectable({ providedIn: 'root' })
export class ConcertCreationService {
    data: any = {
        step1: null,
        step2: null,
        step3: null,
        step4: null,
        step5: null,
        step6: null,
        step7: null,
    };

    update(step: number, value: any) {
        this.data[`step${step}`] = value;
    }

    get(step: number) {
        return this.data[`step${step}`];
    }

    getAll() {
        return this.data;
    }

    http = inject(HttpClient);
    baseUrl = environment.apiBase;

    getVenues() {
        return firstValueFrom(this.http.get<Venue[]>(`${this.baseUrl}/facilities/get_venues`));
    }

    getBands() {
        return firstValueFrom(this.http.get<Band[]>(`${this.baseUrl}/facilities/get_bands`));
    }

    getDecorations() {
        return firstValueFrom(
            this.http.get<Decoration[]>(`${this.baseUrl}/facilities/get_decorations`)
        );
    }
    getSnackBoxes() {
        return firstValueFrom(this.http.get<Snack[]>(`${this.baseUrl}/facilities/get_snacks`));
    }

    async getAvailableDates() {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const startDate = firstDayOfMonth.toISOString().split('T')[0];

        let params = new HttpParams().set('start_date', startDate);



        if (this.data['step1']?.concertTime) {
            params = params.set('slot', this.data['step1'].concertTime);
        }


      

        let values = await firstValueFrom(
            this.http.get<any>(`${this.baseUrl}/calender/booked-events`, { params })
        );

        const map: any = {};

        for (let event of values) {
            const date = event.event_date;

            if (!map[date]) {
                map[date] = { venue_ids: [], band_ids: [], decoration_ids: [] };
            }

            if (event.venue_id) map[date].venue_ids.push(event.venue_id);
            if (event.band_id) map[date].band_ids.push(event.band_id);
            if (event.decoration_id) map[date].decoration_ids.push(event.decoration_id);
        }

        console.log(map);
        

        return map
    }
}
