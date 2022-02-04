import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordSearchGamePage } from './word-search-game.page';

const routes: Routes = [
  {
    path: '',
    component: WordSearchGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordSearchGamePageRoutingModule {}
