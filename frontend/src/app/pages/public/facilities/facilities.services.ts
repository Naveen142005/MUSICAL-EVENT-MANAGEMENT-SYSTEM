import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { first, firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FacilitiesService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiBase;

    getVenues() {
        return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/facilities/get_venues/`));
    }

    async checkAvailability(data: {
        id: number;
        facilityName: string;
        date: string;
        slot: string;
    }): Promise<any> {
        const params = new HttpParams()
            .set('id', data.id)
            .set('facility_name', data.facilityName)
            .set('date', data.date)
            .set('slot', data.slot);

        return firstValueFrom(this.http.get(`${this.baseUrl}/facilities/facility`, { params }));
    }

    getBands() {
        return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/facilities/get_bands/`));
    }
    getDecorations() {
        return firstValueFrom(this.http.get<any[]>(`${this.baseUrl}/facilities/get_decorations/`));
    }
}
