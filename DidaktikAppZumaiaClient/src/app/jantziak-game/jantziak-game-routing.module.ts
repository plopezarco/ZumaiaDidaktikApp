import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JantziakGamePage } from './jantziak-game.page';

const routes: Routes = [
  {
    path: '',
    component: JantziakGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JantziakGamePageRoutingModule {}
