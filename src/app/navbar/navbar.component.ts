import { Component } from '@angular/core';
import { TabService } from '../tab.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private tabService: TabService) {}

  onTabChanged(index: number) {
    this.tabService.selectTab(index);
  }
}