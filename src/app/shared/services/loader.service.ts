import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}

  showLoader() {
    this.isLoading$.next(true);
  }

  hideLoader() {
    this.isLoading$.next(false);
  }

  getLoader() {
    return this.isLoading$.asObservable();
  }
}
