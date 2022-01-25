import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory-game',
  templateUrl: './memory-game.page.html',
  styleUrls: ['./memory-game.page.scss'],
})
export class MemoryGamePage implements OnInit {

  public cardsTotal = 10;
  public cardsArray = [];
  public imageDir = '../assets/img/fruits/';
  public images = ['apple', 'strawberry', 'cherry', 'peach', 'pear']

  public selectCard1pos = -1;
  public selectCard1val = -1;
  public selectCard2pos = -1;
  public selectCard2val = -1;
  public selectOldPosiX = -1;

  constructor() { }

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
          this.cardsArray.splice(this.selectOldPosiX, 1, {pos: this.selectOldPosiX, val: -1});
          this.cardsArray.splice(i, 1, {pos: i, val: -1});
          if(this.winCon()){
            alert("you win!")
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

  winCon(){
    for(var i = 0; i < this.cardsArray.length; i++){
      if(this.cardsArray[i].val != -1) return false;
    }
    return true
  }
}
