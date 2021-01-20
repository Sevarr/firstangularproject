import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../login/login.component';
// import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../auth.service';
import { HomeGuard } from '../guards/home.guard';
import { TokenInterceptor } from '../token.interceptor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
// import { NewEmployeeComponent } from '../../dialog/users/new-employee/new-employee.component';
// import { CandidateFormComponent } from '../../dialog/candidate-form/candidate-form.component';
// import { EmployeeFormComponent } from '../../dialog/employee-form/employee-form.component';
// import { FileUploadComponent } from '../../dialog/file-upload/file-upload.component';
// import {CreateNewAccountComponent} from '../../dialog/accounts/create-new-account/create-new-account.component';


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
    NgbModule,
    ReactiveFormsModule,
    // ReactiveFormsModule,
    // RouterModule.forRoot([
    //   {
    //     path: 'new',
    //     component: CreateNewAccountComponent
    //   },
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
  ],
})
export class AuthModule { }
