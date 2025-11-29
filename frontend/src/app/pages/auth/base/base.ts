import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ModalService } from '../../../shared/model/modal.service';
import { Login } from '../login/login';
import { Signup } from '../signup/signup/signup';
import { ForgetPassword } from '../forget-password/forget-password';

@Component({
    selector: 'app-base',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, Login, Signup, ForgetPassword],
    templateUrl: './base.html',
    styleUrl: './base.css',
})
export class LoginBase {

    isLoginSelected = true;
    isSignUpSelected = false;
    isLoggedIn = false;
    showPassword = false;

    message: string = '';
    messageType: string = '';
    showMessageFlag: boolean = false;

    handleMessage(event: {message: string, type: string}) {
        this.message = event.message;
        this.messageType = event.type;
        this.showMessageFlag = true;

        console.log(event);
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            this.showMessageFlag = false;
        }, 3000);

        if (this.message == 'SignUp successfull! Switching to Login') this.open_model('login')
        
    }

    constructor(
        private fb: FormBuilder, // Keep private here since this is the parent
        private authService: AuthService,
        private modalService: ModalService
    ) {}

  

    open_model(model: string) {
        if (model == 'login') {
            this.isLoginSelected = true;
            this.isSignUpSelected = false;
        } 
        else if (model == "forgot") {
            this.isLoginSelected = false
            this.isLoginSelected = false
        }
        else {
            this.isLoginSelected = false;
            this.isSignUpSelected = true;
        }
    }

    closeModal() {
        this.modalService.close();
    }
}
