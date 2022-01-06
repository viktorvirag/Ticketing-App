import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private readonly _greatestTaskId = new BehaviorSubject<number | null>(null);
  greatestTaskId$ = this._greatestTaskId.asObservable();
  
  constructor() { }
  

  setGreatestTaskIdToStorage() : void {
    localStorage.setItem('greatestTaskId', JSON.stringify(this._greatestTaskId.getValue()));
  }
  returnGreatestTaskId(): number | null {
    return this._greatestTaskId.getValue();
  }
  setGreatestTaskId(id: number): void {
    this._greatestTaskId.next(id);
    this.setGreatestTaskIdToStorage();
  }
  getGreatestId() {
    const greatestIdFromStorage = JSON.parse(localStorage.getItem('greatestTaskId') || 'null');
    this._greatestTaskId.next(greatestIdFromStorage);
  }
}
