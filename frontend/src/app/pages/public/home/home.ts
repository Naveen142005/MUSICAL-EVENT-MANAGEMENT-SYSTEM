import { AfterViewInit, Component, inject } from '@angular/core';
import { HeroSection } from './components/hero-section/hero-section';
import { environment } from '../../../../environments/environment';
import { QuickStats } from './components/quick-stats/quick-stats';
import { HomeService } from './home.service';
import { VenueSlide } from '../../../core/interfaces/venue-carousel.interface';
import { CommonModule, JsonPipe } from '@angular/common';
import { VenueCarousel } from './components/venue-carousel/venue-carousel';
import { BandCards } from "./components/band-cards/band-cards";
import { BandsSection } from '../../../core/interfaces/band-cads.interface';
import { Testimonial } from '../../../core/interfaces/feedback.interface';
import { Testimonials } from "./components/testimonials/testimonials";
import { FaqItem, FaqSection } from '../../../core/interfaces/faq.interface';
import { FAQ } from "./components/faq/faq";
import { AboutUsSection } from '../../../core/interfaces/aboutus.interface';
import { AboutUs } from "./components/about-us/about-us";
import { FooterSection } from '../../../core/interfaces/footer.interface';
import { Footer } from "./components/footer/footer";

@Component({
    selector: 'app-home',
    imports: [HeroSection, QuickStats, CommonModule, VenueCarousel, BandCards, Testimonials, FAQ, AboutUs, Footer],
    standalone: true,
    templateUrl: './home.html',
    styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit {
    ngAfterViewInit() {
        this.enableCustomCursor();
    }

    enableCustomCursor() {
        const outside = document.getElementById('outside') as HTMLElement;
        const inside = document.getElementById('inside') as HTMLElement;

        let targetX = -100,
            targetY = -100;
        let targetX1 = -100,
            targetY1 = -100;
        let currentX = 0,
            currentY = 0;
        let currentX1 = 0,
            currentY1 = 0;

        function lerp(start: number, end: number, factor: number) {
            return start + (end - start) * factor;
        }

        window.addEventListener('mousemove', (event) => {
            targetX = event.clientX - 20;
            targetY = event.clientY - 20;
            targetX1 = event.clientX - 6;
            targetY1 = event.clientY - 6;
        });

        function animate() {
            currentX = lerp(currentX, targetX, 0.1);
            currentY = lerp(currentY, targetY, 0.1);
            currentX1 = lerp(currentX1, targetX1, 0.15);
            currentY1 = lerp(currentY1, targetY1, 0.15);

            if (outside) {
                outside.style.left = `${currentX}px`;
                outside.style.top = `${currentY}px`;
            }
            if (inside) {
                inside.style.left = `${currentX1}px`;
                inside.style.top = `${currentY1}px`;
            }

            requestAnimationFrame(animate);
        }

        animate();

        document.querySelectorAll('button, a, input, textarea, select, .nav').forEach((element) => {
            element.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            element.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.add('cursor-click');
        });
        document.addEventListener('mouseup', () => {
            document.body.classList.remove('cursor-click');
        });
    }


    homeService = inject(HomeService);
    baseAPI = environment.apiBase + '/'
    venueSlides: VenueSlide[] = [];
    bandsCards: BandsSection | null = null
    testimonials: Testimonial[] = [];
    faq: FaqSection | null = null;
    aboutus: AboutUsSection | null = null
    footer: FooterSection    | null = null

    async ngOnInit() {

        this.venueSlides = (await this.homeService.getVenueCarousel()).slides;
        this.venueSlides = this.venueSlides.map((slide) => ({
            ...slide,
            image_path: slide.image_path
                ? this.baseAPI + slide.image_path
                : '',
        }));


        this.bandsCards = await this.homeService.getBandsSection();
        this.bandsCards.bands.map((card) => {
            if (card.image_url) card.image_url = this.baseAPI  + card.image_path
        })


        this.testimonials = await this.homeService.getTestimonials();

        this.faq = await this.homeService.getFAQ();

        this.aboutus = await this.homeService.getAboutUs()
        this.aboutus.gallery_images = this.aboutus.gallery_images.map((image) => image = this.baseAPI  + image)      
        
        this.footer = await this.homeService.getFooter()
        this.footer.background_image = this.baseAPI  +this.footer.background_image

        console.log(this.venueSlides);
        console.log(this.bandsCards);
        console.log(this.testimonials);
        console.log(this.faq);
        console.log(this.aboutus);
        console.log(this.footer);
        
        
        
        
    }

    sample = 'http://127.0.0.1:8000/uploads/content/3d4af930-05e6-4b2c-8bfd-2fc61215311f.png'
}
