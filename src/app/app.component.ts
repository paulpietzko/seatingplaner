import { Component } from '@angular/core';
import { TabService } from './tab.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  selectedTab = 0;

  constructor(private tabService: TabService) {
    this.tabService.selectedTab$.subscribe(tabIndex => {
      this.selectedTab = tabIndex;
    });
  }
}