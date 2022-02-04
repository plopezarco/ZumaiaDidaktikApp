import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WordSearchGamePageRoutingModule } from './word-search-game-routing.module';

import { WordSearchGamePage } from './word-search-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WordSearchGamePageRoutingModule
  ],
  declarations: [WordSearchGamePage]
})
export class WordSearchGamePageModule {}
