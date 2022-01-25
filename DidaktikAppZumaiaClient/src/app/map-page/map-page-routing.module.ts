import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KokapenaPage } from '../kokapena/kokapena.page';

import { MapPagePage } from './map-page.page';

const routes: Routes = [
  {
    path: '',
    component: MapPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapPagePageRoutingModule {}
