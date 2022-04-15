import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  loaderStatus: EventEmitter<any> = new EventEmitter();
  constructor() {}

  showLoader() {
    this.loaderStatus.emit(true);
  }
  hideLoader() {
    this.loaderStatus.emit(false);
  }
}
