import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  constructor(private route: Router) {  }

  ngOnInit() {
  }

  mapaZabaldu(){
    this.route.navigate(['/map-page']);
  }
  
  ahorcadoZabaldu(){
    this.route.navigate(['/ahorcado-game']);
  }

  memoryZabaldu(){
    this.route.navigate(['/memory-game']);
  }

  puzzleZabaldu(){
    this.route.navigate(['/puzzle-game']);
  }

  drumZabaldu(){
    this.route.navigate(['/drum-game'])
  }

  infoZabaldu(id: string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        idKokapen: id
      }
    };

    this.route.navigate(['/info-page'], navigationExtras);
  }
}
