import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {AppComponent} from '../app.component';
// import {BrowserModule} from '@angular/platform-browser';
// import {AppRoutingModule} from '../app-routing.module';
// import {AuthModule} from '../auth/auth/auth.module';
// import {HttpClientModule} from '@angular/common/http';
// import {RouterModule} from '@angular/router';
// import {EmployeeDataService} from '../services/data/employee-data.service';
// import { CreateNewAccountComponent} from '../dialog/accounts/create-new-account/create-new-account.component';
// import { RegisterNewAccountComponent} from '../dialog/accounts/register-new-account/register-new-account.component';
// import {AdminComponent} from '../dialog/users/admin/admin.component';
import {HomeComponent} from './home.component';
import {CandidateFormComponent} from '../dialog/candidate-form/candidate-form.component';
// import {EmployeeFormComponent} from '../dialog/employee-form/employee-form.component';
// import {TopBarComponent} from '../top-bar/top-bar.component';
import {NewEmployeeComponent} from '../dialog/users/new-employee/new-employee.component';
// import {HREmployeeComponent} from '../dialog/users/hr-employee/hr-employee.component';
// import {FileDownloadComponent} from '../dialog/file-download/file-download.component';
import {FileUploadComponent} from '../dialog/file-upload/file-upload.component';
import {NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    HomeComponent,
    // CreateNewAccountComponent,
    // RegisterNewAccountComponent,
    // LoginComponent,
    // AdminComponent,
    // CandidateFormComponent,
    // EmployeeFormComponent,
    // TopBarComponent,
    // HREmployeeComponent,
    NewEmployeeComponent,
    // CreateNewAccountComponent,
    // FileDownloadComponent,
    FileUploadComponent,
    CandidateFormComponent,

  ],
  // AppComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    NgbModule,
    // NgbModule,
    // NgbModule,
    // NgModule,
    // FormsModule,
    // BrowserModule,
    // AuthModule,
    // HttpClientModule,
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
  ]
  // bootstrap: [AppComponent]
})
export class HomeModule { }
