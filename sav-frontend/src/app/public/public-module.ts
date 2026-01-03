import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PublicRoutingModule } from './public-routing-module';
import { Login } from './login/login';
import { Register } from './register/register';
import { ForgotPassword } from './forgot-password/forgot-password';
import { ResetPassword } from './reset-password/reset-password';

@NgModule({
  declarations: [
    Login,
    Register,
    ForgotPassword,
    ResetPassword
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
