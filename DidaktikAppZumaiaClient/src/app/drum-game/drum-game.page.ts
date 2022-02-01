import { Component, OnInit } from '@angular/core';
import { SmartAudioService } from '../services/smart-audio.service';

@Component({
  selector: 'app-drum-game',
  templateUrl: './drum-game.page.html',
  styleUrls: ['./drum-game.page.scss'],
})
export class DrumGamePage implements OnInit {

  public drumImg : number = 0;
  public imageDir = '../assets/img/drum/drum';

  constructor(public smartAudio: SmartAudioService) {
    smartAudio.preload('drum', 'assets/audio/drum.mp3')
   }

  ngOnInit() {
  }

  playDrum(){
    this.smartAudio.play('drum');
    if(this.drumImg == 0){
      this.drumImg = 1;
    }else{
      this.drumImg = 0;
    }
  }
}
