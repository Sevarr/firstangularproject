import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home.routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateNewAccountComponent } from '../dialog/accounts/create-new-account/create-new-account.component';
import { HomeComponent } from './home.component';
import { CandidateFormComponent } from '../dialog/candidate-form/candidate-form.component';
import { EmployeeFormComponent } from '../dialog/employee-form/employee-form.component';
import {TopBarComponent} from '../top-bar/top-bar.component';
import {AdminComponent} from '../dialog/users/admin/admin.component';
import {NewEmployeeComponent} from '../dialog/users/new-employee/new-employee.component';
import {HREmployeeComponent} from '../dialog/users/hr-employee/hr-employee.component';
import {FileDownloadComponent} from '../dialog/file-download/file-download.component';
import {FileUploadComponent} from '../dialog/file-upload/file-upload.component';
import {NgbDatepickerModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChangeAccountDataComponent } from '../dialog/accounts/change-account-data/change-account-data.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateNewAccountComponent,
    CandidateFormComponent,
    EmployeeFormComponent,
    TopBarComponent,
    AdminComponent,
    HREmployeeComponent,
    NewEmployeeComponent,
    FileDownloadComponent,
    FileUploadComponent,
    ChangeAccountDataComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDatepickerModule,
    NgbModule,
  ]
})
export class HomeModule { }
