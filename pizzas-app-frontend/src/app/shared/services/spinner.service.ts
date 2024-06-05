import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public imageUploaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  private _hideSpinner: boolean = true;

  constructor() { }

  public get hideSpinner(): boolean {
    return this._hideSpinner;
  }

  public changeSpinner(hideSpinner: boolean) {
    this._hideSpinner = hideSpinner;
    console.log({hide: this._hideSpinner})
  }

  
}
