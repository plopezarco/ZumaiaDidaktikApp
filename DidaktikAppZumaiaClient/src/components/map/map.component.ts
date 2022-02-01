import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { Kokapena } from 'src/app/interfaces/kokapena';
import { KokapenaService } from 'src/app/services/kokapena.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  kokapenak: Kokapena[] = [];

  constructor(private map: MapService, private kokapenaService: KokapenaService) { }

  async getKokapenakAPI() {
      this.kokapenaService.getKokapenak().subscribe(data => {
      this.kokapenak = data;
      this.map.buildMap(this.kokapenak);
    },
      error => console.log('Error::' + error));
  }

  async getKokapenak() {
    this.kokapenak = [{"IdKokapena":1, "Latitudea":"43.290467710659314", "Longitudea":"-2.2561401900674816", "Izena":"Zumaiako Eskola", "Irudia":"http://1.bp.blogspot.com/_ydSq9IhdaV4/TKuhnXV6oFI/AAAAAAAAAOU/UKv7fzOpqeA/s1600/03_ikastetxea.jpg"},
    {"IdKokapena":2, "Latitudea":"43.294052109835846", "Longitudea":"-2.2534043368893992", "Izena":"Aita Mari Arraun Elkartea", "Irudia":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Club_d%27aviron_Aita_Mari.jpg/640px-Club_d%27aviron_Aita_Mari.jpg"},
    {"IdKokapena":3, "Latitudea":"43.29680669355058", "Longitudea":"-2.2584515504847835", "Izena":"Udaletxea", "Irudia":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Zumaiako_udaletxea.dd.jpg/442px-Zumaiako_udaletxea.dd.jpg"},
    {"IdKokapena":4, "Latitudea":"43.297274264020785", "Longitudea":"-2.2560659880017853", "Izena":"Kultur-Etxea", "Irudia":"http://www.laventanadelarte.es/images/gipuzkoa/8052/centro-8052-18051810281199a5c9.jpg"},
    {"IdKokapena":5, "Latitudea":"43.29727140817687", "Longitudea":"-2.2566796719846027", "Izena":"San Pedro Eliza", "Irudia":"https://upload.wikimedia.org/wikipedia/commons/c/c9/Church_of_Saint_Peter_Zumaia.jpg"},
    {"IdKokapena":6, "Latitudea":"43.298988977136695", "Longitudea":"-2.2609761829002593", "Izena":"San Telmoko Ermita", "Irudia":"https://gmdavid.com/wp-content/uploads/2020/04/ermita-de-san-telmo-lateral.jpg"},
    {"IdKokapena":7, "Latitudea":"43.30373221093571", "Longitudea":"-2.2463313669578127", "Izena":"Zumaiako Flysch-ak", "Irudia":"https://media.traveler.es/photos/6137691c86b46eac7cf59e2c/master/w_1600%2Cc_limit/153499.jpg"}];
    this.map.buildMap(this.kokapenak);
  }

  ngOnInit() {
    this.getKokapenak()
  }

}