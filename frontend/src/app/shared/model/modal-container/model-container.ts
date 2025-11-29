// src/app/shared/modal/modal-container/modal-container.component.ts
import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  template: `
   
    <div class="modal-box">
      <ng-template #modalHost></ng-template>
    </div>
  `,
  styleUrls: ['modal-container.css']
})
export class ModalContainerComponent {

  @ViewChild('modalHost', { read: ViewContainerRef, static: true })
  modalHost!: ViewContainerRef;

  closeFn: any;

  close() {
    if (this.closeFn) this.closeFn();
  }
}
