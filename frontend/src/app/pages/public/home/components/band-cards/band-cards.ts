import { Component, Input } from '@angular/core';
import { BandsSection } from '../../../../../core/models/band-cads.interface';

@Component({
  selector: 'app-band-cards',
  imports: [],
  templateUrl: './band-cards.html',
  styleUrl: './band-cards.css',
})
export class BandCards {
    @Input() bandsCards:BandsSection | null = null
}
