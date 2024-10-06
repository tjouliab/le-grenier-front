import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  GoogleMapsModule,
  MapInfoWindow,
  MapMarker,
} from '@angular/google-maps';
import { POSITION } from '../../../environments/environment';

interface LocationResponse {
  name: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {
  @ViewChild(MapInfoWindow, { static: false }) infoWindow?: MapInfoWindow;

  position: LocationResponse = POSITION;

  height: string = '600px';
  width: string = '600px';

  markers: Set<google.maps.marker.AdvancedMarkerElement> = new Set();

  infoContent: string = '';

  polylineOptions: google.maps.PolylineOptions = {
    path: [],
    strokeColor: '#F78F08',
    strokeOpacity: 1.0,
    strokeWeight: 5,
    draggable: false,
  };

  mapOptions: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    mapId: 'customMap',
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'hybrid',
    zoom: 6,
    maxZoom: 15,
    minZoom: 4,
  };

  ngOnInit(): void {
    this.centerMap();
    this.addMarker(this.position);
  }

  centerMap(): void {
    this.mapOptions.center = {
      lat: this.position?.latitude ?? 0,
      lng: this.position?.longitude ?? 0,
    };
  }

  loadMarker(
    location?: LocationResponse
  ): google.maps.marker.AdvancedMarkerElement {
    return new google.maps.marker.AdvancedMarkerElement({
      position: {
        lat: location?.latitude ?? 0,
        lng: location?.longitude ?? 0,
      },
      title: location?.name ?? '',
    });
  }

  addMarker(location: LocationResponse): void {
    const marker = this.loadMarker(location);
    this.markers.add(marker);
  }

  moveMap(event: any): void {
    if (event.latLng != null) {
      this.mapOptions.center = event.latLng.toJSON();
    }
  }

  openMapInfo(content: string, marker: MapMarker): void {
    this.infoContent = content;
    this.infoWindow?.open(marker);
  }
}
