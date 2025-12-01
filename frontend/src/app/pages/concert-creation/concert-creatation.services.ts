import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConcertCreationService {
    data: any = {
        step1: null,
        step2: null,
        step3: null,
        step4: null,
        step5: null,
        step6: null,
        step7: null,
    };

    update(step: number, value: any) {
        this.data[`step${step}`] = value;
    }

    get(step: number) {
        return this.data[`step${step}`];
    }
}   
