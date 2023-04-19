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
  lat: string = '';
  lng: string = '';
  nome: string = '';
  private map: any;

  constructor(private mapService: MapService) {}

  logout(): void {
    localStorage.clear();
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  saveMarker(): void {
    this.mapService.save(this.nome, this.lat, this.lng).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  compila(): void {
    this.lat = this.mapService.currentLat;
    this.lng = this.mapService.currentLng;
  }
}
