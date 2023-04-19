import { Component } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  showModal: boolean = false;
  isAdmin: boolean =
    localStorage.getItem('role')?.toString().toUpperCase() === 'ADMIN';
  private map: any;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.initMap(this.map);
  }

  logout(): void {
    localStorage.clear();
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }
}
