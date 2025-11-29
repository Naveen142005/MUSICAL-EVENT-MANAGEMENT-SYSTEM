import { Component } from '@angular/core';
import { ModalService } from '../../../../../shared/model/modal.service';
import { LoginBase } from '../../../../auth/base/base';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { ClickOutsideDirective } from '../../../../../shared/directives/close-model.directives';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-hero-section',
    imports: [ClickOutsideDirective, RouterLinkActive, RouterLink],
    standalone: true,
    templateUrl: './hero-section.html',
    styleUrls: ['./hero-section.css'],
})
export class HeroSection {
    constructor(private modalService: ModalService, public auth: AuthService) {}
    showSupport = false;
    dropDown = false

    openSupport() {
        this.showSupport = true;

    }

    ngOnInit() {
        if (sessionStorage.getItem('token')) {
            this.auth.isLoggedIn.set(true);
        }
        
    }
    closeSupport() {
        this.showSupport = false;
    }

    hero_section_image_url = 'assets/hero_section.jpg';

    openModal() {

        console.log(this.auth.getUser());
        console.log(this.auth.getUserRole());
        
        const childRef = this.modalService.open(LoginBase);

        // Optional: Pass data to the modal content
        // childRef.instance.someProperty = 'some value';
    }
}
