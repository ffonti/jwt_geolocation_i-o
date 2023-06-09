import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';
import 'leaflet-draw';
import { Observable } from 'rxjs';

const iconUrl = 'assets/flower.jpg';
const iconDefault = icon({
  iconUrl,
  iconSize: [40, 40],
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
  hasPoligono: boolean = false;
  layer: any = undefined;
  map: any;
  visualizzaMarkers: boolean = false;

  constructor(private http: HttpClient) {}

  initMap(map: any): any {
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

    const drawFeatures = new L.FeatureGroup();
    map.addLayer(drawFeatures);

    const drawControl = new L.Control.Draw({
      draw: {
        rectangle: false,
        circlemarker: false,
        polyline: false,
        polygon: {
          allowIntersection: false,
          shapeOptions: {
            color: '#145DA0',
            fillOpacity: 0.1,
          },
        },
        circle: {
          shapeOptions: {
            color: '#145DA0',
            fillOpacity: 0.1,
          },
        },
      },
      edit: {
        featureGroup: drawFeatures,
      },
    });
    map.addControl(drawControl);

    map.on('draw:created', (e: any) => {
      this.layer = e.layer;
      if (e.layerType === 'marker') {
        this.currentLat = e.layer._latlng.lat;
        this.currentLng = e.layer._latlng.lng;
        const marker = L.marker([+this.currentLat, +this.currentLng]);
        marker.addTo(map).bindPopup('marker');
      } else if (drawFeatures.getLayers().length) {
        console.log('Non possono esistere più poligoni!');
        map.removeLayer(e.layer);
      } else {
        drawFeatures.addLayer(this.layer);
        this.layer.on('remove', (e: any) => {
          this.getMarkersFromUserId(localStorage.getItem('id')).subscribe({
            next: (res: any) => {
              this.showMarkersOnMap(this.map, res.markers);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        });
      }
    });

    this.map = map;
    return map;
  }

  save(nome: string, lat: string, lng: string): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/v1/saveMarker',
      { nome, lat, lng },
      { headers: this.userData, observe: 'response' }
    );
  }

  getMarkersFromUser(user: any): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/v1/getMarkers/' +
        user.id.toString().toLowerCase().trim(),
      { headers: this.userData }
    );
  }

  getMarkersFromUserId(id: any): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/v1/getMarkers/' + id.toString().trim(),
      { headers: this.userData }
    );
  }

  showMarkersOnMap(map: any, markers: any): void {
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
    const allMarkers = L.layerGroup().addTo(map);
    allMarkers.clearLayers();
    for (let marker of markers) {
      const m = L.marker([marker.lat, marker.lng]);
      m.addTo(allMarkers).bindPopup('marker');
    }
  }

  pickLayersFromBE(): void {
    if (this.layer !== undefined) {
      this.markersInLayer(this.layer).subscribe({
        next: (res) => {
          this.showMarkersOnMap(this.map, res.body.filteredMarkers);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      if (!this.visualizzaMarkers) {
        this.map.eachLayer((layer: any) => {
          if (layer instanceof L.Marker) {
            this.map.removeLayer(layer);
          }
        });
      } else {
        this.getMarkersFromUserId(localStorage.getItem('id')).subscribe({
          next: (res) => {
            this.showMarkersOnMap(this.map, res.markers);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
    this.layer = undefined;
  }

  markersInLayer(layer: any): Observable<any> {
    const userId: string = localStorage.getItem('id')!;

    if (layer._radius) {
      const type = 'circle';
      const center = layer._latlng;
      const radius = layer._mRadius;
      return this.http.post(
        'http://localhost:3000/api/v1/getMarkers/inLayer/' +
          userId.toString().trim(),
        { type, center, radius },
        {
          headers: this.userData,
          observe: 'response',
        }
      );
    } else {
      const type = 'polygon';
      const points = layer._latlngs[0];

      return this.http.post(
        'http://localhost:3000/api/v1/getMarkers/inLayer/' +
          userId.toString().trim(),
        { type, points },
        {
          headers: this.userData,
          observe: 'response',
        }
      );
    }
  }

  showFilteredMarkersOnMap(map: any, markers: any): void {
    map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });
  }
}
