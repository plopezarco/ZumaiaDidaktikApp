import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { SmartAudioService } from '../services/smart-audio.service';
import { Howl } from "howler";

@Component({
  selector: 'app-drum-game',
  templateUrl: './drum-game.page.html',
  styleUrls: ['./drum-game.page.scss'],
})
export class DrumGamePage implements OnInit {

  public drumImg: number = 0;
  public imageDir = '../assets/img/drum/drum';

  abestia;
  danborra;

  constructor(public smartAudio: SmartAudioService, public smartAudio2: SmartAudioService, public alertController: AlertController, private route: Router) {
    this.abestia = new Howl({ src: ['assets/audio/kokapen-5-1.mp3'], volume: 0.90 });
    this.danborra = new Howl({ src: ['assets/audio/drum.mp3'] });
    this.abestia.play();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.abestia.pause();
  }

  playDrum() {
    this.danborra.play();
    if (this.drumImg == 0) {
      this.drumImg = 1;
    } else {
      this.drumImg = 0;
    }
  }

  bukatu() {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ziur zaude bukatu nahi duzula?',
      buttons: [{
        text: 'EZ', handler: () => { },
      }, {
        text: 'OK', handler: () => {
          this.abestia.pause();
          this.route.navigate(['/map-page']);
        },
      }],
      backdropDismiss: false
    });
    await alert.present();
  }
}
