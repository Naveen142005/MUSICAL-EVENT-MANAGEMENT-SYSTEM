import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { VenueCaroselSection, VenueSlide } from '../../../core/models/venue-carousel.interface';
import { BandsSection } from '../../../core/models/band-cads.interface';

@Injectable({ providedIn: 'root' })
export class HomeService {
    private http = inject(HttpClient);
    private base = environment.apiBase;

    getVenueCarousel(): Promise<VenueCaroselSection> {
        return firstValueFrom(
            this.http.get<VenueCaroselSection>(`${this.base}/contents/venue-carousel`)
        );
    }

    getBandsSection(): Promise<BandsSection> {
        return firstValueFrom(this.http.get<BandsSection>(`${this.base}/contents/bands`));
    }
}
