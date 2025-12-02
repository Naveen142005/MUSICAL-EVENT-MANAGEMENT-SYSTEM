import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Band, Venue } from './models/venues-bands.interfaces';
import { firstValueFrom } from 'rxjs';

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

    http = inject(HttpClient);
    baseUrl = environment.apiBase;

    getVenues() {
        return firstValueFrom(this.http.get<Venue[]>(`${this.baseUrl}/facilities/get_venues`));
    }

    getBands() {
        return firstValueFrom(this.http.get<Band[]>(`${this.baseUrl}/facilities/get_bands`));
    }
}
