import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'dav-cooks-base-unsubscribe',
  template: ''
})
export class BaseUnsubscribeComponent implements OnDestroy {

  protected unsubscribe$ = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
