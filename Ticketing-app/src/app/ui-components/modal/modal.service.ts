import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  // private _IsOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // IsOpened$: Observable<boolean> = this._IsOpened.asObservable();
  constructor() { }

  disableScroll() {
    document.body.style.overflow = 'hidden';
  }
  enableScroll() {
    document.body.style.overflow = 'auto';
  } 
}
