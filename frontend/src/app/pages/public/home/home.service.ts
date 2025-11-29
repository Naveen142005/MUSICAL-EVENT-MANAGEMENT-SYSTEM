import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { VenueCaroselSection, VenueSlide } from '../../../core/interfaces/venue-carousel.interface';
import { BandsSection } from '../../../core/interfaces/band-cads.interface';
import { Testimonial } from '../../../core/interfaces/feedback.interface';
import { FaqItem, FaqSection } from '../../../core/interfaces/faq.interface';
import { AboutUsSection } from '../../../core/interfaces/aboutus.interface';
import { FooterSection } from '../../../core/interfaces/footer.interface';

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
        return firstValueFrom(
            this.http.get<BandsSection>(`${this.base}/contents/bands`)
        );
    }

    getTestimonials() {
        return firstValueFrom(
            this.http.get<Testimonial[]>(`${this.base}/feedback/testimonials`)
        );
    }

    getFAQ(){
        return firstValueFrom(
            this.http.get<FaqSection>(`${this.base}/contents/faq`)
        )
    }

    getAboutUs(){
        return firstValueFrom(
            this.http.get<AboutUsSection>(`${this.base}/contents/about-us`)
        )
    }

    getFooter() {
        return firstValueFrom (
            this.http.get<FooterSection>(`${this.base}/contents/footer`)
        )
    }
}
