import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import { Observable } from 'rxjs';

const iconUrl = 'assets/marker-icon.png';
const iconDefault = icon({
  iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
Marker.prototype.options.icon = iconDefault;

@Injectable({
  providedIn: 'root',
})
export class MapService {
  userData = new HttpHeaders({
    'x-access-token': localStorage.getItem('token')
      ? `${localStorage.getItem('token')}`
      : '',
    id: localStorage.getItem('id') ? `${localStorage.getItem('id')}` : '',
    username: localStorage.getItem('username')
      ? `${localStorage.getItem('username')}`
      : '',
    role: localStorage.getItem('role') ? `${localStorage.getItem('role')}` : '',
  });
  currentLat: string = '';
  currentLng: string = '';

  constructor(private http: HttpClient) {}

  initMap(map: any): void {
    map = L.map('map', {
      center: [41.9027835, 12.4963655], //Coordinate di Roma
      zoom: 10,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(map);

    map.on('click', (e: any) => {
      this.currentLat = e.latlng.lat;
      this.currentLng = e.latlng.lng;
      this.mark(map, e.latlng);
    });
  }

  mark(map: any, latlng: L.LatLng): void {
    const marker = L.marker([latlng.lat, latlng.lng]);
    marker.addTo(map).bindPopup(latlng.lat.toString());
    marker.on('click', () => {
      marker.remove();
    });
  }

  save(nome: string, lat: string, lng: string): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/v1/saveMarker/',
      { nome, lat, lng },
      { headers: this.userData, observe: 'response' }
    );
  }
}
