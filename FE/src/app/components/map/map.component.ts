import { Component } from '@angular/core';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  private map: any;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.map = this.mapService.initMap(this.map);
  }
}
