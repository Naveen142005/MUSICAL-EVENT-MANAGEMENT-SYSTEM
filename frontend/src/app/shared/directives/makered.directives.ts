import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[makered]',
  standalone: true
})
export class MakeRedDirective implements OnInit {
    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        this.elementRef.nativeElement.style.color = 'red';
    }
}
