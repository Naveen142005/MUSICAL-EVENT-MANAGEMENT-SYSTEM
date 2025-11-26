import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  imports: [],
  standalone: true,
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css'],
})
export class HeroSection {
  showSupport = false;

  openSupport() {
    this.showSupport = true;
  }

  closeSupport() {
    this.showSupport = false;
  }
  hero_section_image_url = 'assets/hero_section.jpg';

}
