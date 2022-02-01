import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DrumGamePageRoutingModule } from './drum-game-routing.module';

import { DrumGamePage } from './drum-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrumGamePageRoutingModule
  ],
  declarations: [DrumGamePage]
})
export class DrumGamePageModule {}
