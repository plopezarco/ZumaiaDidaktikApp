import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jantziak-game',
  templateUrl: './jantziak-game.page.html',
  styleUrls: ['./jantziak-game.page.scss'],
})
export class JantziakGamePage implements OnInit {

  public imageDir = '../assets/img/jantzia.png';

  public hitzak: string[] = ["Zapia", "Gerruntzea", "Alkandora Txuria", "Mantala", "Gona", "Abarkak"];
  constructor() { }

  ngOnInit() {
    this.shuffle(this.hitzak)
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }
}
