import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KokapenaPageRoutingModule } from './kokapena-routing.module';

import { KokapenaPage } from './kokapena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KokapenaPageRoutingModule
  ],
  declarations: [KokapenaPage]
})
export class KokapenaPageModule {}
