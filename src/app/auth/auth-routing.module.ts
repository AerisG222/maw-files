import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpaSigninComponent } from './spa-signin/spa-signin.component';
import { SpaSigninSilentComponent } from './spa-signin-silent/spa-signin-silent.component';

const routes: Routes = [
    { path: '',       component: SpaSigninComponent },
    { path: 'silent', component: SpaSigninSilentComponent},
    { path: '**',     redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
