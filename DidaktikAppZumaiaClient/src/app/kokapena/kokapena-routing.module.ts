import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KokapenaPage } from './kokapena.page';

const routes: Routes = [
  {
    path: '',
    component: KokapenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KokapenaPageRoutingModule {}
