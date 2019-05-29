import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
    { path: 'auth',     loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'help',     loadChildren: () => import('./help/help.module').then(m => m.HelpModule),             canActivate: [ AuthGuard ] },
    { path: 'home',     loadChildren: () => import('./home/home.module').then(m => m.HomeModule),             canActivate: [ AuthGuard ] },
    { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule), canActivate: [ AuthGuard ] },
    { path: '**',   redirectTo: 'home' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
