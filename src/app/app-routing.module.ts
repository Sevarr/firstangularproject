import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

// const routes: Routes = [];
const routes: Routes = [
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

// @NgModule({
//   imports: [
//     RouterModule.forRoot([
//       {path: 'login', component: LoginComponent}
//     ])
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {
// }
