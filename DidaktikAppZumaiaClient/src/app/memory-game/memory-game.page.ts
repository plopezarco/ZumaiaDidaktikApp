import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.page.html',
  styleUrls: ['./memory-game.page.scss'],
})
export class MemoryGamePage implements OnInit {

  public cardsTotal = 10;
  public cardsArray = [];
  public imageDir = '../assets/img/memory/';
  public images = ['arrauna', 'kresala', 'telmo_deun', 'trainera', 'zumaia']

  public selectCard1pos = -1;
  public selectCard1val = -1;
  public selectCard2pos = -1;
  public selectCard2val = -1;
  public selectOldPosiX = -1;

  constructor(public alertController: AlertController, private route: Router) { }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Irabazi Duzu!',
      message: '<img src="https://img.freepik.com/vector-gratis/trofeo-oro-placa-ganador-concurso_68708-545.jpg?size=338&ext=jpg">',
      buttons: [{
        text: 'OK', handler: () => {
            this.route.navigate(['/map-page']);
        }
      }],
      backdropDismiss: false
    });
    await alert.present();
  }

  ngOnInit() {
    this.populateCards();
    this.shuffle(this.cardsArray);
    this.shuffle(this.images);
  }

  // Kartak "bete"
  populateCards() {
    this.cardsArray = [];
    var x = 0;
    var y = 0;
    for (var i = 0; i < this.cardsTotal; i++) {
      this.cardsArray.push({ pos: i, val: y });
      if (x == 0) {
        x = 1;
      } else {
        x = 0;
        y++;
      }
    }
  }

  // Karta aukeratu
  selectCard(pos, val, i) {
    var actionOne = false;

    if (this.selectCard1pos > -1 && this.selectCard2pos == -1) {
      this.selectCard2pos = pos;
      this.selectCard2val = val;
      actionOne = true;
    }

    if (this.selectCard1pos == -1 && !actionOne) {
      this.selectCard1pos = pos;
      this.selectCard1val = val;
      this.selectOldPosiX = i;
    }

    if (actionOne && this.selectCard1pos > -1 && this.selectCard2pos > -1) {
      setTimeout(() => {
        if (this.selectCard1val == this.selectCard2val) {
          this.cardsArray.splice(this.selectOldPosiX, 1, { pos: this.selectOldPosiX, val: -1 });
          this.cardsArray.splice(i, 1, { pos: i, val: -1 });
          if (this.winCon()) {
            this.presentAlertConfirm();
          }
        }
        this.resetSelects();
      }, 1000);
    }
  }

  // Kartak aleatoriamente ordenatu
  shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

  // Aukeratutako kartak reseteatu
  resetSelects() {
    this.selectCard1pos = -1;
    this.selectCard1val = -1;
    this.selectCard2pos = -1;
    this.selectCard2val = -1;
  }

  winCon() {
    for (var i = 0; i < this.cardsArray.length; i++) {
      if (this.cardsArray[i].val != -1) return false;
    }
    return true
  }
}
