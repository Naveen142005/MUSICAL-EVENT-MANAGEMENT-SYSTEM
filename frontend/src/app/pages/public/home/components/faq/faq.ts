import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { FaqItem, FaqSection } from '../../../../../core/models/faq.interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-faq',
    imports: [CommonModule],
    templateUrl: './faq.html',
    styleUrl: './faq.css',
})
export class FAQ {
    @Input() faqList: FaqSection | null = null;

    openIndex: number | null = null;

    toggle(i: number) {
			console.log('Toggle clicked', i);
        this.openIndex = this.openIndex === i ? null : i;
    }

    isOpen(i: number): boolean {
			
        return this.openIndex === i;
    }
}
