import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AhorcadoGamePageRoutingModule } from './ahorcado-game-routing.module';

import { AhorcadoGamePage } from './ahorcado-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AhorcadoGamePageRoutingModule
  ],
  declarations: [AhorcadoGamePage]
})
export class AhorcadoGamePageModule {}
