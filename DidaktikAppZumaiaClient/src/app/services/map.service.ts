import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';
import * as Leaflet from 'leaflet';
import { Kokapena } from '../interfaces/kokapena';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map: Leaflet.Map;
  lat = 43.29635084636639;
  lng = -2.2566499547403245;
  zoom = 13.5;


  constructor() { }

  buildMap(kokapenak: Kokapena[]) {
    if (this.map == null) {
      this.map = Leaflet.map('map');
    }
    const self = this;

    this.map.on("load", function () {
      setTimeout(() => {
        self.map.invalidateSize();
      }, 1);
    });

    this.map.setView([this.lat, this.lng], this.zoom);

    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      minZoom: 14,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: environment.mapBoxToken
    }).addTo(this.map);

    if (kokapenak.length > 0) {
      kokapenak.forEach(e => {
        var marker = Leaflet.marker([Number.parseFloat(e.Latitudea), Number.parseFloat(e.Longitudea)]).addTo(this.map);
        marker.bindPopup("<img style='width:200%; height:200%' src='" + e.Irudia + "'/><h4>" + e.Izena + `</h4><ion-button [routerLink]="['kokapena',`+ e.IdKokapena + `]">Jolastu</ion-button>`)
      })
    }
  }
}