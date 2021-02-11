import { Component, OnInit } from '@angular/core';
import { NewUserRegistrationService } from '../../../services/user_registration/new-user-registration.service';

@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.css']
})
export class CreateNewAccountComponent implements OnInit {
  private data: any;
  loggedUserType;
  hideRegisterButton = true;
  hideWorkerRegistrationLink = false;
  hideRegistrationLink = false;
  registrationLink: string;
  userType: string;

  hideWorkerRegisterButton: boolean;
  hidehrEmployeeRegisterButton: boolean;
  hideAdminRegisterButton: boolean;

  constructor(private userRegistrationService: NewUserRegistrationService) {
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
    if (this.loggedUserType === 'admin') {
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
}
