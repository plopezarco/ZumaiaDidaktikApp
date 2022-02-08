import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as mapboxgl from 'mapbox-gl';
import * as Leaflet from 'leaflet';
import { Kokapena } from '../interfaces/kokapena';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map: Leaflet.Map;
  lat = 43.29635084636639;
  lng = -2.2566499547403245;
  zoom = 15;
  route: Router;
  mapBoxToken: 'pk.eyJ1IjoicGxvcGV6YXJjbyIsImEiOiJja3ljeDA3dHMwcmtxMnJwNW9uNGJ2dWdoIn0.FnsH5eeftzNGgT5nay_UCw.FnsH5eeftzNGgT5nay_UCw';

  constructor() { }

  buildMap(kokapenak: Kokapena[]) : Leaflet.Map {
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
      //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      minZoom: 15,
      tileSize: 512,
      id: 'mapbox/streets-v11',
      zoomOffset: -1,
      accessToken: environment.mapBoxToken
    }).addTo(this.map);

    return this.map;
  }

  infoIkusi(){
    this.route.navigate(['/puzzle-game'])
  }

  destroyMap(){
    this.map.remove();
  }
}