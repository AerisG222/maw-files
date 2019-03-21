import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SpaSigninComponent } from './spa-signin/spa-signin.component';
import { SpaSigninSilentComponent } from './spa-signin-silent/spa-signin-silent.component';

@NgModule({
    declarations: [
        SpaSigninComponent,
        SpaSigninSilentComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule
    ]
})
export class AuthModule { }
