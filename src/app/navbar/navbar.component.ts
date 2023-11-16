import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onTabChanged(index: number) {
    switch (index) {
      case 0:
        this.router.navigate(['/home']);
        break;
      case 1:
        this.router.navigate(['/generator']);
        break;
      case 2:
        this.router.navigate(['/tutorial']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }
}