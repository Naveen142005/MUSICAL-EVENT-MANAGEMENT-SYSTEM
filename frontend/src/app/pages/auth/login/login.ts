import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ModalService } from '../../../shared/model/modal.service';
import { FormHelpers } from '../../../shared/utils/form-helpers';
import { extractErrorMessage } from '../../../shared/utils/error-execter';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {

   
    @Output() showMessage = new EventEmitter<{message: string, type: string}>();
    @Output() isSelectedForgotPassword = new EventEmitter<string>();


    loginForm: FormGroup;
    showPassword = false;

    message: string = '';
    messageType: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private modalService: ModalService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    

    onLoginSubmit() {
        if (this.loginForm.valid) {
            const loginData = this.loginForm.value;
            this.authService.login(loginData.email, loginData.password).subscribe({
                next: (res) => {
                    this.showMessage.emit({
                        message: 'Login successful!',
                        type: 'text-green-500',
                    });

                    this.authService.isLoggedIn.set(true)
                },
                error: (err) => {

                    this.showMessage.emit({
                        message: extractErrorMessage(err),
                        type: 'text-red-500',
                    });

                    console.log(extractErrorMessage(err));
                    
                },
            });
        } else {
            FormHelpers.markFormGroupTouched(this.loginForm);
            this.showMessage.emit({
                message: 'Please fill in all required fields',
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
