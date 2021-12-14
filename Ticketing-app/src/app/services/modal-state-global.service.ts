import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalStateGlobalService {
  public modals: {[key: string]: boolean} = {
    createBoardModal : false  
  }
  constructor() { }

  openModal(key: string) {
    this.modals[key] = true;
  }
  closeModal(key: string) {
    this.modals[key] = false;
  }
}
