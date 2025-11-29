// src/app/shared/modal/modal.service.ts
import {
    Injectable,
    ApplicationRef,
    createComponent,
    EnvironmentInjector,
    ComponentRef,
} from '@angular/core';
import { ModalContainerComponent } from './modal-container/model-container';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private currentModal: ComponentRef<ModalContainerComponent> | null = null;

    constructor(private appRef: ApplicationRef, private injector: EnvironmentInjector) {}

    open(component: any, data?: any) {
        const modalRef: ComponentRef<ModalContainerComponent> = createComponent(
            ModalContainerComponent,
            {
                environmentInjector: this.injector,
            }
        );

        this.appRef.attachView(modalRef.hostView);
        document.body.appendChild(modalRef.location.nativeElement);

        // Load content component INSIDE the container
        const childRef = modalRef.instance.modalHost.createComponent(component);

        // Pass data to the child component
        if (data) {
            const instance = childRef.instance as any;
            Object.keys(data).forEach(key => {
                instance[key] = data[key];
            });
            childRef.changeDetectorRef.detectChanges();
        }

        modalRef.instance.closeFn = () => {
            this.appRef.detachView(modalRef.hostView);
            modalRef.destroy();
            this.currentModal = null;
        };

        this.currentModal = modalRef;
        
        console.log(data);
        
        return childRef;



    }

    close() {
        if (this.currentModal) {
            this.currentModal.instance.closeFn();
        }
    }
}
