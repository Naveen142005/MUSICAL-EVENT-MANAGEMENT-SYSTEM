import { Component, Input } from '@angular/core';
import { FooterSection } from '../../../../../core/interfaces/footer.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
    @Input() footer: FooterSection | null = null;
}
