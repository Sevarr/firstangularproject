import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth/auth.module';
import {AppComponent} from './app.component';
// import { CreateNewAccountComponent } from './dialog/accounts/create-new-account/create-new-account.component';
// import { RegisterNewAccountComponent } from './dialog/accounts/register-new-account/register-new-account.component';
// import {LoginComponent} from './login/login.component';
// import {AdminComponent} from './dialog/users/admin/admin.component';
// import {HomeComponent} from './home/home.component';
// import {CandidateFormComponent} from './dialog/candidate-form/candidate-form.component';
// import {EmployeeFormComponent} from './dialog/employee-form/employee-form.component';
// import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {TopBarComponent} from './top-bar/top-bar.component';
// import {HttpClientModule} from '@angular/common/http';
// import {NewEmployeeComponent} from './dialog/users/new-employee/new-employee.component';
// import {HREmployeeComponent} from './dialog/users/hr-employee/hr-employee.component';
// import {FileDownloadComponent} from './dialog/file-download/file-download.component';
// import {FileUploadComponent} from './dialog/file-upload/file-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    // CreateNewAccountComponent,
    // RegisterNewAccountComponent,
    // // LoginComponent,
    // AdminComponent,
    // HomeComponent,
    // CandidateFormComponent,
    // EmployeeFormComponent,
    // TopBarComponent,
    // HREmployeeComponent,
    // NewEmployeeComponent,
    // CreateNewAccountComponent,
    // FileDownloadComponent,
    // FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    // RouterModule.forRoot([
      // {
      //   path: 'login',
      //   component: LoginComponent
      // },
      // {
      // path: 'logout',
      // component: LogoutComponent
      // },
      // {
      //   path: 'admin',
      //   component: AdminComponent,
      //   // canActivate: [AuthGuard]
      // },
      // {
      //   path: 'user',
      //   component: NewEmployeeComponent,
      //   // canActivate: [AuthGuard]
      // },
      // {
      //   path: 'hr_employee',
      //   component: HREmployeeComponent,
      // },
      // {
      //   path: 'new_employee',
      //   component: NewEmployeeComponent,
      // },
      // {
      //   path: '',
      //   component: HomeComponent,
      //   // component: LoginComponent,
      // },
      // {
      //   path: 'candidate_form',
      //   component: CandidateFormComponent,
      // },
      // {
      //   path: 'app_top_bar',
      //   component: TopBarComponent,
      // },
      // {
      //   path: 'employee_form',
      //   component: EmployeeFormComponent,
      // },
      // {
      //   path: 'file_upload',
      //   component: FileUploadComponent,
      // },
      // {
      //   path: 'file_download',
      //   component: FileDownloadComponent,
      // }
    // ]),
    NgbModule,
    // FormsModule,
    // ReactiveFormsModule,
    // HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
