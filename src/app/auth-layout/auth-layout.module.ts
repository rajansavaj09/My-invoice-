import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RegistrarComponent } from './registrar/registrar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrarComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule, 
    TranslateModule,
    // BrowserAnimationsModule,
  ]
})
export class AuthLayoutModule { }
