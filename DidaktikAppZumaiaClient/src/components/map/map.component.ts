import { Component, ElementRef, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { Kokapena } from 'src/app/interfaces/kokapena';
import { KokapenaService } from 'src/app/services/kokapena.service';
import { NavigationExtras, Router } from '@angular/router';
import * as Leaflet from 'leaflet';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  kokapenak: Kokapena[] = [];

  mapL: Leaflet.Map;

  constructor(private map: MapService, private kokapenaService: KokapenaService, private route: Router, public loadingController: LoadingController) { }

  async getKokapenakAPI() {
    this.kokapenaService.getKokapenak().subscribe(data => {
      this.kokapenak = data;
      this.mapL = this.map.buildMap(this.kokapenak);
      if (this.kokapenak.length > 0) {
        this.kokapenak.forEach(e => {
          var marker = Leaflet.marker([Number.parseFloat(e.Latitudea), Number.parseFloat(e.Longitudea)]).addTo(this.mapL);
          var content = "<img style='width:200%; height:200%' src='" + e.Irudia + "'/><h4>" + e.Izena + '</h4><ion-button class="kokapena-btn" id="kokapen-' + e.IdKokapena + '">JOLASTU</ion-button>';
          marker.bindPopup(content);
          marker.addEventListener('click', () => {
            document.getElementById('kokapen-' + e.IdKokapena).addEventListener('click', () => { this.infoIkusi(e.IdKokapena.toString()) });
          });
        });
      }
    },
      error => console.log('Error::' + error));
  }

  async getKokapenak() {
    if (this.kokapenak.length === 0) {
      this.kokapenak = this.kokapenaService.getKokapenakLocal();
      this.mapL = this.map.buildMap(this.kokapenak);
      if (this.kokapenak.length > 0) {
        this.kokapenak.forEach(e => {
          var marker = Leaflet.marker([Number.parseFloat(e.Latitudea), Number.parseFloat(e.Longitudea)]).addTo(this.mapL);
          var content = "<img style='width:200%; height:200%' src='" + e.Irudia + "'/><h4>" + e.Izena + '</h4><ion-button class="kokapena-btn" id="kokapen-' + e.IdKokapena + '">JOLASTU</ion-button>';
          marker.bindPopup(content);
          marker.addEventListener('click', () => {
            document.getElementById('kokapen-' + e.IdKokapena).addEventListener('click', () => { this.infoIkusi(e.IdKokapena.toString()) });
          });
        });
      }
    }
  }

  ngOnInit() {
    this.map = new MapService();
    this.getKokapenakAPI()
  }

  ngOnDestroy() {
    this.map.destroyMap();
  }

  infoIkusi(id: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        idKokapen: id
      }
    };
    this.route.navigate(['/info-page'], navigationExtras);
   // this.presentLoading().then(()=> {this.route.navigate(['/info-page'], navigationExtras);})
  }

  /*async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Itxaron mesedez...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }*/
}