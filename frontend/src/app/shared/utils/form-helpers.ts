import { FormGroup, AbstractControl } from '@angular/forms';

export class FormHelpers {
    static strongPasswordValidator() {
        return (control: AbstractControl) => {
            const value = control.value;
            if (!value) return null;

            const hasMinLength = value.length >= 8;
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumber = /[0-9]/.test(value);
            const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);

            const passwordValid = hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;

            return !passwordValid
                ? { strongPassword: { hasMinLength, hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar } }
                : null;
        };
    }

    static passwordMatchValidator(form: AbstractControl) {
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        } else {
            if (confirmPassword?.hasError('passwordMismatch')) {
                confirmPassword.setErrors(null);
            }
        }
        return null;
    }

    static markFormGroupTouched(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((key) => {
            const control = formGroup.get(key);
            control?.markAsTouched();

            if (control instanceof FormGroup) {
                FormHelpers.markFormGroupTouched(control);
            }
        });
    }

    static hasError(form: FormGroup, field: string, error: string): boolean {
        const control = form.get(field);
        return !!(control && control.hasError(error) && control.touched);
    }

    static isFieldInvalid(form: FormGroup, field: string): boolean {
        const control = form.get(field);
        return !!(control && control.invalid && control.touched);
    }
}
