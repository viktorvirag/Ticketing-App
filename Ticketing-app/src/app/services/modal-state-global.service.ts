import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalStateGlobalService {
  public modals: {
    [key: string]: boolean,
  } = {
    createBoardModal: false
  }
  constructor() { }

  openModal(key: string, id?: number) {
    const targetKey = id ? `${key}-${id}` : key;
    this.modals[targetKey] = true;
  }
  closeModal(key: string, id?: number) {
    const targetKey = id ? `${key}-${id}` : key;
    this.modals[targetKey] = false;
  }
}
