import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterNewAccountComponent } from '../dialog/accounts/register-new-account/register-new-account.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  declarations: [RegisterNewAccountComponent]
})
export class HomeRoutingModule { }
