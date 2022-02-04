import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JantziakGamePageRoutingModule } from './jantziak-game-routing.module';

import { JantziakGamePage } from './jantziak-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JantziakGamePageRoutingModule
  ],
  declarations: [JantziakGamePage]
})
export class JantziakGamePageModule {}
