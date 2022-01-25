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

  async getKokapenak() {
      this.kokapenaService.getKokapenak().subscribe(data => {
      this.kokapenak = data;
      this.map.buildMap(this.kokapenak);
    },
      error => console.log('Error::' + error));
  }

  ngOnInit() {
    console.log('1')
    this.getKokapenak()
  }

}