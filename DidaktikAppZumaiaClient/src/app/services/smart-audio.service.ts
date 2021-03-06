import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})
export class SmartAudioService {

  audioType: string = 'html5';
  audioAsset;
    sounds: any = [];
    constructor(public nativeAudio: NativeAudio, platform: Platform) {
        if(platform.is('cordova')){
            this.audioType = 'native';
        }
    }
    preload(key, asset) {
        if(this.audioType === 'html5'){
            let audio = {
                key: key,
                asset: asset,
                type: 'html5'
            };
            this.sounds.push(audio);
        } else {
            this.nativeAudio.preloadSimple(key, asset);
            let audio = {
                key: key,
                asset: key,
                type: 'native'
            };
            this.sounds.push(audio);
        }
    }
    play(key){
        let audio = this.sounds.find((sound) => {
            return sound.key === key;
        });
        if(audio.type === 'html5'){
            this.audioAsset = new Audio(audio.asset);
            this.audioAsset.play();
        } else {
            this.nativeAudio.play(audio.asset).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });
        }
    }

    pause(){
        this.audioAsset.pause();
    }
}
