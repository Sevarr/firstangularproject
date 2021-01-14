import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// @ts-ignore
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../auth.service';
import { HomeGuard } from '../guards/home.guard';
import { TokenInterceptor } from '../token.interceptor';


@NgModule({
  declarations: [LoginComponent],
  providers: [
    AuthGuard,
    AuthService,
    HomeGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AuthModule { }
