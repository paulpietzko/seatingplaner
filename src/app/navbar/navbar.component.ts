import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private routes = ['/home', '/generator', '/tutorial'];

  constructor(private router: Router) { }

  onTabChanged(index: number) {
    const route = this.routes[index] || '/'; // mat-tab index wird mit routes array abgeglichen
    this.router.navigate([route]);
  }
}