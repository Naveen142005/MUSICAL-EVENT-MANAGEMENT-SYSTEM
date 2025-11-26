import { Component, ElementRef, ViewChild, AfterViewInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenueSlide } from '../../../../../core/models/venue-carousel.interface';


@Component({
  selector: 'app-venue-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './venue-carousel.html',
  styleUrls: ['./venue-carousel.css'],
})
export class VenueCarousel implements AfterViewInit {
  @Input() venueSlides: VenueSlide[] = [];

  @ViewChild('carousel') carousel!: ElementRef<HTMLElement>;
  @ViewChild('list') list!: ElementRef<HTMLElement>;
  @ViewChild('nextBtn') nextBtn!: ElementRef<HTMLElement>;
  @ViewChild('prevBtn') prevBtn!: ElementRef<HTMLElement>;

  timeRunning = 3000;
  timeAutoNext = 5000;
  runTimeOut: any;
  runNextAuto: any;

  ngAfterViewInit() {
    this.nextBtn.nativeElement.onclick = () => this.showSlider('next');
    this.prevBtn.nativeElement.onclick = () => this.showSlider('prev');

    this.runNextAuto = setTimeout(() => {
      this.nextBtn.nativeElement.click();
    }, this.timeAutoNext);
  }

  showSlider(type: 'next' | 'prev') {
    const listEl = this.list.nativeElement;
    const carouselEl = this.carousel.nativeElement;
    const items = listEl.querySelectorAll('.item');

    if (type === 'next') {
      listEl.appendChild(items[0]);
      carouselEl.classList.add('next');
    } else {
      listEl.prepend(items[items.length - 1]);
      carouselEl.classList.add('prev');
    }

    clearTimeout(this.runTimeOut);
    this.runTimeOut = setTimeout(() => {
      carouselEl.classList.remove('next');
      carouselEl.classList.remove('prev');
    }, this.timeRunning);

    clearTimeout(this.runNextAuto);
    this.runNextAuto = setTimeout(() => {
      this.nextBtn.nativeElement.click();
    }, this.timeAutoNext);
  }
}
