import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/services/auth.guard';

const routes: Routes = [
    { path: 'auth',     loadChildren: './auth/auth.module#AuthModule' },
    { path: 'help',     loadChildren: './help/help.module#HelpModule',             canActivate: [ AuthGuard ] },
    { path: 'home',     loadChildren: './home/home.module#HomeModule',             canActivate: [ AuthGuard ] },
    { path: 'settings', loadChildren: './settings/settings.module#SettingsModule', canActivate: [ AuthGuard ] },
    { path: '**',   redirectTo: 'home' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
