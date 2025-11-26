import { Component, Input } from '@angular/core';
import { Testimonial } from '../../../../../core/models/feedback.interface';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  imports: [DatePipe, CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css',
})
export class Testimonials {
   @Input() testimonials: Testimonial[] = [];
    currentSlide = 0;
  cardsPerView = 1;

  ngOnInit() {
    this.updateCardsPerView();
    window.addEventListener('resize', () => this.updateCardsPerView());
    this.autoSlide();
  }

  updateCardsPerView() {
    this.cardsPerView = window.innerWidth >= 768 ? 3 : 1;
  }

  next() {
    if (this.currentSlide < this.totalSlides - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
  }

  prev() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.totalSlides - 1;
    }
  }

  goTo(slide: number) {
    this.currentSlide = slide;
  }

  get totalSlides() {
    return Math.ceil(this.testimonials.length / this.cardsPerView);
  }

  autoSlide() {
    setInterval(() => this.next(), 4000);
  }

  getTransform() {
    const move = -(this.currentSlide * (100 / this.cardsPerView));
    return `translateX(${move}%)`;
  }
}
