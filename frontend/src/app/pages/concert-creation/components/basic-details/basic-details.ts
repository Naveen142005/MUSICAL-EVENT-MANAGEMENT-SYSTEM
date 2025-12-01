import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ConcertCreationService } from '../../concert-creatation.services';

@Component({
    selector: 'app-basic-details',
    imports: [FormsModule, ReactiveFormsModule, CommonModule],
    templateUrl: './basic-details.html',
    styleUrl: './basic-details.css',
})
export class BasicDetails {
    step1Form!: FormGroup;
    concertTime: string = '';
    nextButtonClicked = false;

    @Output() next = new EventEmitter<number>();
    @Output() summary = new EventEmitter<any>();

    fb = inject(FormBuilder);
    concertCreation = inject(ConcertCreationService);

    eventBannerFile: File | null = null;

    ngOnInit() {
        const old = this.concertCreation.get(1)?.data;  

        this.nextButtonClicked = false;
        this.concertTime = old?.concertTime || '';
        this.eventBannerFile  = old?.eventBanner || null
        
        console.log(old);
        

        this.step1Form = this.fb.group({
            fullName: [
                old?.fullName || '',
                [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z ]+$/)],
            ],
            email: [
                old?.email || '',
                [
                    Validators.required,
                    Validators.email,
                    Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
                ],
            ],
            mobile: [old?.mobile || '', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
            eventName: [old?.eventName || '', Validators.required],
            eventDescription: [
                old?.eventDescription || '',
                [Validators.required, Validators.minLength(10)],
            ],
            eventBanner: [null, [Validators.required]],
        });
    }

    updateConcertTime(time: string) {
        this.concertTime = time;
    }

    onBannerSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.eventBannerFile = file;
            this.step1Form.patchValue({ eventBanner: file });
        }
    }

    nextStep() {
        this.nextButtonClicked = true;
        if (this.step1Form.invalid) {
            this.step1Form.markAllAsTouched();
            alert('Please fill all required fields');
            return;
        }

        const data = {
            ...this.step1Form.value,
            eventBanner: this.eventBannerFile,
            concertTime: this.concertTime,
        };

        this.concertCreation.update(1, data);
        this.summary.emit({ step: 1, data: data });
        this.next.emit(1);

        console.log('Step 1 Data:', data);
        console.log("Updated data:", this.concertCreation.get(1));
        
        // TODO: send to BookingService
        // this.bookingService.update({ basicDetails: data });
    }
}
