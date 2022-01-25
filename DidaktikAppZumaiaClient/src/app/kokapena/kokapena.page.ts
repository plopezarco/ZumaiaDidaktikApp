import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Kokapena } from '../interfaces/kokapena';
import { KokapenaService } from '../services/kokapena.service';

@Component({
  selector: 'app-kokapena',
  templateUrl: './kokapena.page.html',
  styleUrls: ['./kokapena.page.scss'],
})
export class KokapenaPage implements OnInit {

  kokapena: Kokapena[];
  constructor(private kokapenaService: KokapenaService, private route: ActivatedRoute, private location: Location) { }

  getKokapena(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.kokapenaService.getKokapena(id)
      .subscribe(data => {
        this.kokapena = data;
      }, error => console.log('Error :: ' + error));
  }

  goBack(): void { 
    this.location.back(); 
  }

  ngOnInit() {
    this.getKokapena();
  }

}
