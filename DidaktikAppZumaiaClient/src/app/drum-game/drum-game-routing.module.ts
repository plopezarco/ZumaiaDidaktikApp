import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DrumGamePage } from './drum-game.page';

const routes: Routes = [
  {
    path: '',
    component: DrumGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DrumGamePageRoutingModule {}
