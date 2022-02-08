import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'map-page',
    loadChildren: () => import('./map-page/map-page.module').then( m => m.MapPagePageModule)
  },
  {
    path: 'memory-game',
    loadChildren: () => import('./memory-game/memory-game.module').then( m => m.MemoryGamePageModule)
  },
  {
    path: 'puzzle-game',
    loadChildren: () => import('./puzzle-game/puzzle-game.module').then( m => m.PuzzleGamePageModule)
  },
  {
    path: 'drum-game',
    loadChildren: () => import('./drum-game/drum-game.module').then( m => m.DrumGamePageModule)
  },
  {
    path: 'info-page',
    loadChildren: () => import('./info-page/info-page.module').then( m => m.InfoPagePageModule)
  },
  {
    path: 'ahorcado-game',
    loadChildren: () => import('./ahorcado-game/ahorcado-game.module').then( m => m.AhorcadoGamePageModule)
  },
  {

    path: 'word-search-game',
    loadChildren: () => import('./word-search-game/word-search-game.module').then(m => m.WordSearchGamePageModule)
  },
  {
    path: 'jantziak-game',
    loadChildren: () => import('./jantziak-game/jantziak-game.module').then( m => m.JantziakGamePageModule)
  },  {
    path: 'asmakizuna',
    loadChildren: () => import('./asmakizuna/asmakizuna.module').then( m => m.AsmakizunaPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
