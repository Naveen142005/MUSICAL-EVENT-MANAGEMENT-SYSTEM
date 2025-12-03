import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-date-checking',
    imports: [CommonModule],
    templateUrl: './date-checking.html',
    styleUrl: './date-checking.css',
})
export class DateChecking {
    selectDate(arg0: string) {
        throw new Error('Method not implemented.');
    }

    calendar: {
        day: number;
        date: string;
        isPast: boolean;
        isAvailable: boolean;
    }[][] = [];

    nxtDisabled = false;
    prevDisabled = true;
    currMonth: number = 0;
    today = new Date();
    currYear: number = 0;
    monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    ngOnInit() {
        this.currMonth = this.today.getMonth();
        this.currYear = this.today.getFullYear();

        this.generateCalendar(this.today.getMonth(), this.today.getFullYear());
    }

    generateCalendar(month: number, year: number) {
        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        let cnt = 1;

        // Always create 6 rows for safety (some months need 6)
        this.calendar = Array.from({ length: 6 }, () =>
            Array.from({ length: 7 }, () => ({
                day: 0,
                date: '',
                isPast: false,
                isAvailable: false,
            }))
        );

        const isPastDate = (d: number) => {
            const full = new Date(year, month, d);
            return (
                full <
                new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())
            );
        };

        // First week
        for (let j = firstDay; j < 7 && cnt <= totalDays; j++) {
            const fullDate = `${year}-${month + 1}-${cnt}`;
            this.calendar[0][j] = {
                day: cnt,
                date: fullDate,
                isPast: isPastDate(cnt),
                isAvailable: !isPastDate(cnt),
            };
            cnt++;
        }

        // Remaining weeks
        for (let i = 1; i < 6 && cnt <= totalDays; i++) {
            for (let j = 0; j < 7 && cnt <= totalDays; j++) {
                const fullDate = `${year}-${month + 1}-${cnt}`;
                this.calendar[i][j] = {
                    day: cnt,
                    date: fullDate,
                    isPast: isPastDate(cnt),
                    isAvailable: !isPastDate(cnt),
                };
                cnt++;
            }
        }

        console.log(this.calendar);
    }
    nextMonth() {
        this.prevDisabled = false;
        const max = new Date(this.today.getFullYear() + 1, this.today.getMonth(), 1);

        const next = new Date(this.currYear, this.currMonth + 1, 1);

        // If going beyond max → block it
        if (next > max) {
            this.nxtDisabled = true;
            return;
        }

        this.currMonth += 1;

        if (this.currMonth > 11) {
            this.currMonth = 0;
            this.currYear += 1;
        }

        this.generateCalendar(this.currMonth, this.currYear);
    }
    prevMonth() {
        const current = new Date(); // today's date
        const thisMonth = current.getMonth();
        const thisYear = current.getFullYear();
        if (!this.prevDisabled) {
            if (this.currMonth === 0) {
                this.currMonth = 11;
                this.currYear--;
            } else {
                this.currMonth--;
            }
        }
        // Block going past the current month of the current year
        if (this.currYear === thisYear && this.currMonth == thisMonth) {
            this.prevDisabled = true;
            return; // Stop here
        }

        // Normal backward movement
    }
}
