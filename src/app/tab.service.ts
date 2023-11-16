import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private selectedTabSource = new BehaviorSubject<number>(0);
  selectedTab$ = this.selectedTabSource.asObservable();

  selectTab(index: number) {
    this.selectedTabSource.next(index);
  }
}
