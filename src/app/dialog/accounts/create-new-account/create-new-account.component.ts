import { Component, OnInit } from '@angular/core';
import { NewUserRegistrationService } from '../../../services/user_registration/new-user-registration.service';
// import { ApiService } from '../../../services/api/api.service';
// import { catchError, mapTo, tap } from 'rxjs/operators';
// import { of} from 'rxjs';

@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.css']
})
export class CreateNewAccountComponent implements OnInit {
  private data: any;
  loggedUserType: string;
  hideRegisterButton = true;
  hideWorkerRegistrationLink = false;
  // hideHREmployeeRegistrationLink = false;
  // hideAdminRegistrationLink = false;
  hideRegistrationLink = false;
  registrationLink: string;
  userType: string;

  hideWorkerRegisterButton: boolean;
  hidehrEmployeeRegisterButton: boolean;
  hideAdminRegisterButton: boolean;

  constructor(private userRegistrationService: NewUserRegistrationService) {
    // this.generateRegisterLink();
    this.loggedUserType = this.userRegistrationService.getLoggedUserType();
    this.showAll();
  }

  ngOnInit(): void {
  }

  hideAll(){
    this.hideWorkerRegisterButton = false;
    this.hidehrEmployeeRegisterButton = false;
    this.hideAdminRegisterButton = false;
  }

  showAll(){
    if (this.loggedUserType = 'ADMIN') {
      this.hideWorkerRegisterButton = true;
      this.hidehrEmployeeRegisterButton = true;
      this.hideAdminRegisterButton = true;
    } else {
      this.hideWorkerRegisterButton = true;
      this.hidehrEmployeeRegisterButton = false;
      this.hideAdminRegisterButton = false;
    }
  }

  generateRegistrationLink(userType){
    this.registrationLink = null;
    this.userType = userType;
    this.registrationLink = this.userRegistrationService.getRegistrationLink(userType);
    this.hideRegistrationLink = true;
    this.hideAll();
  }

  // getRegistratonLink(){
  //   this.hideRegisterButton = false;
  //   this.hideWorkerRegistrationLink = true;
  //   this.registrationLink = this.apiService.getWorkerRegistrationLink();
  // }
  //
  // generateRegisterLink() {
  //   console.log(this.apiService.newWorkerRegistrationLink());
  //   // @ts-ignore
  //   // if (this.apiService.getUserType === ('ADMIN')) {
  //     console.log(this.apiService.newHREmployeeRegistrationLink());
  //     console.log(this.apiService.newAdminRegistrationLink());
  //   // }
  // }
  //
  // generateAdminRegisterLink(){
  //   console.log(this.apiService.newAdminRegistrationLink());
  // }
  //
  // getAdminRegistratonLink() {
  //   console.log(this.apiService.getAdminRegistrationLink());
  // }
  //
  // getWorkerRegistratonLink() {
  //   console.log(this.apiService.newWorkerRegistrationLink());
  //   this.hideRegisterButton = false;
  //   this.hideWorkerRegistrationLink = true;
  //   this.registrationLink = this.apiService.getWorkerRegistrationLink();
  // }
  //
  // getHREmployeeRegistratonLink() {
  //   console.log(this.apiService.newHREmployeeRegistrationLink());
  // }

}
