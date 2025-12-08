import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConcertCreationService } from '../../concert-creatation.services';

@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './payment.html',
    styleUrl: './payment.css',
})
export class Payment implements OnInit {
    @Input() totalamount: number = 0;
    @Output() previous = new EventEmitter<any>();
   

    private fb = inject(FormBuilder);
    private concertCreationServicer = inject(ConcertCreationService)

    paymentForm!: FormGroup;
    isProcessing = false;
    showTermsError = false;
    paymentAmount: string = ''

    ngOnInit() {
        this.paymentForm = this.fb.group({
            paymentAmount: ['full', Validators.required],
            paymentMethod: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue],
        });
    }
    changePaymentAmount(amount: string) {
        
        this.paymentAmount = amount
        console.log(this.paymentAmount);
    }

    get selectedAmount(): number {
        const amountType = this.paymentForm.get('paymentAmount')?.value;
        return amountType === 'full' ? this.totalamount : this.totalamount / 2;
    }

    onPrevious() {
        this.previous.emit(-1);
    }

    onCompleteBooking() {
        // Mark all fields as touched to show validation errors
        this.paymentForm.markAllAsTouched();

        // Check if terms are accepted
        if (!this.paymentForm.get('acceptTerms')?.value) {
            this.showTermsError = true;
            return;
        }

        // Validate entire form
        if (this.paymentForm.invalid) {
            return;
        }

        this.isProcessing = true;
        this.showTermsError = false;

        const paymentData = {
            amount: this.selectedAmount,
            paymentType: this.paymentForm.get('paymentAmount')?.value,
            paymentMethod: this.paymentForm.get('paymentMethod')?.value,
            termsAccepted: this.paymentForm.get('acceptTerms')?.value,
        };
        this.concertCreationServicer.update(7,paymentData);
    }

    get paymentMethodError(): boolean {
        const control = this.paymentForm.get('paymentMethod');
        return !!(control?.invalid && control?.touched);
    }
}
