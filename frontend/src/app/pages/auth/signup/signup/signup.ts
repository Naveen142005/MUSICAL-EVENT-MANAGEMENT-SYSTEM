import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { ModalService } from '../../../../shared/model/modal.service';
import { FormHelpers } from '../../../../shared/utils/form-helpers';
import { extractErrorMessage } from '../../../../shared/utils/error-execter';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './signup.html',
    styleUrl: './signup.css',
})
export class Signup {
    @Output() showMessage = new EventEmitter<{ message: string; type: string }>();

    signupForm: FormGroup;
    showPassword = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private modalService: ModalService
    ) {
        this.signupForm = this.fb.group(
            {
                name: ['', [Validators.required, Validators.minLength(3)]],
                email: ['', [Validators.required, Validators.email]],
                phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
                password: ['', [Validators.required, FormHelpers.strongPasswordValidator()]],
                confirmPassword: ['', [Validators.required]],
                role: ['', [Validators.required]],
            },
            { validators: FormHelpers.passwordMatchValidator }
        );
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    async onSignupSubmit() {
        if (this.signupForm.valid) {
            const { confirmPassword, ...dataToSend } = this.signupForm.value;
            dataToSend['phone'] = Number(dataToSend['phone']);

            try {
                const o = await this.authService.register(dataToSend);
                console.log(o);

                // Show success message
                this.showMessage.emit({
                    message: 'SignUp successfull! Switching to Login',
                    type: 'text-green-500',
                });

                // Optional: Switch to login tab or redirect
                // this.activeTab = 'login';
                // Or navigate: this.router.navigate(['/login']);
            } catch (error: any) {
                // Show error message
                this.showMessage.emit({
                    message: extractErrorMessage(error),
                    type: 'text-red-500',
                });
                console.error('Registration error:', error);
            }
        } else {
            FormHelpers.markFormGroupTouched(this.signupForm);
            this.showMessage.emit({
                message: 'Please fill in all required fields correctly',
                type: 'text-red-500',
            });
        }
    }

    hasError(form: FormGroup, field: string, error: string): boolean {
        return FormHelpers.hasError(form, field, error);
    }

    // Match the template signature: isFieldInvalid(form, field)
    isFieldInvalid(form: FormGroup, field: string): boolean {
        return FormHelpers.isFieldInvalid(form, field);
    }
}
