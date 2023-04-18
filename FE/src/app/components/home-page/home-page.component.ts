import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  isAdmin: boolean =
    localStorage.getItem('role')?.toString().toUpperCase() === 'ADMIN';

  logout(): void {
    localStorage.clear();
  }
}
