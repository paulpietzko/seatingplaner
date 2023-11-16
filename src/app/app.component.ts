import { Component } from '@angular/core';
import { TabService } from './tab.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedTab: number = 0;

  constructor(private tabService: TabService) {
    this.tabService.selectedTab$.subscribe(tabIndex => {
      this.selectedTab = tabIndex;
    });
  }
}