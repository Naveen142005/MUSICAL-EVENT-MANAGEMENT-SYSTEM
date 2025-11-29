import { Component, Input } from '@angular/core';
import { AboutUsSection } from '../../../../../core/interfaces/aboutus.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
    @Input() aboutus : AboutUsSection | null = null
}
