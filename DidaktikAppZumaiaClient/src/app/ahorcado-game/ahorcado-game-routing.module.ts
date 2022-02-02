import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AhorcadoGamePage } from './ahorcado-game.page';

const routes: Routes = [
  {
    path: '',
    component: AhorcadoGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AhorcadoGamePageRoutingModule {}
