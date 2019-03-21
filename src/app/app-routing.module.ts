import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
    { path: '',            component: HomeComponent,  canActivate: [ AuthGuard ] },
    { path: 'auth',        loadChildren: './auth/auth.module#AuthModule' },
    { path: '**',          redirectTo: '/' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
