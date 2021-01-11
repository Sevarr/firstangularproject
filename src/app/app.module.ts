import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {HomeComponent} from './home/home.component';
import {CandidateFormComponent} from './dialog/candidate-form/candidate-form.component';
import {EmployeeFormComponent} from './dialog/employee-form/employee-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EducationFormComponent} from './dialog/candidate-form/education-form/education-form.component';
import {SchoolModalComponent} from './dialog/candidate-form/school-modal/school-modal.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {TopBarComponent} from './top-bar/top-bar.component';
import {DocumentGeneratorComponent} from './document-generator/document-generator.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    CandidateFormComponent,
    EmployeeFormComponent,
    EducationFormComponent,
    SchoolModalComponent,
    TopBarComponent,
    DocumentGeneratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      // {
      // path: 'logout',
      // component: LogoutComponent
      // },
      {
        path: 'admin',
        component: AdminComponent,
        // canActivate: [AuthGuard]
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'candidate_form',
        component: CandidateFormComponent,
      },
      {
        path: 'app_top_bar',
        component: TopBarComponent,
      },
      {
        path: 'employee_form',
        component: EmployeeFormComponent,
      },
      {
        path: 'document_generator',
        component: DocumentGeneratorComponent,
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
