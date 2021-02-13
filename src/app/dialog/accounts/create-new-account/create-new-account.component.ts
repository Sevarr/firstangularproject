import { Component, OnInit } from '@angular/core';
import { NewUserRegistrationService } from '../../../services/user_registration/new-user-registration.service';

@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.css']
})
export class CreateNewAccountComponent implements OnInit {
  loggedUserType;
  hideWorkerRegistrationLink = false;
  hideRegistrationLink = false;
  registrationLink: string;
  userType: string;

  hideWorkerRegisterButton: boolean;
  hideHREmployeeRegisterButton: boolean;
  hideAdminRegisterButton: boolean;

  constructor(private userRegistrationService: NewUserRegistrationService) {
    this.loggedUserType = this.userRegistrationService.getLoggedUserType();
    this.showAll();
  }

  ngOnInit(): void {
  }

  hideAll(): any{
    this.hideWorkerRegisterButton = false;
    this.hideHREmployeeRegisterButton = false;
    this.hideAdminRegisterButton = false;
  }

  showAll(): any {
    if (this.loggedUserType === 'admin') {
      this.hideWorkerRegisterButton = true;
      this.hideHREmployeeRegisterButton = true;
      this.hideAdminRegisterButton = true;
    } else {
      this.hideWorkerRegisterButton = true;
      this.hideHREmployeeRegisterButton = false;
      this.hideAdminRegisterButton = false;
    }
  }

  generateRegistrationLink(userType): any {
    this.registrationLink = null;
    this.userType = userType;
    this.registrationLink = this.userRegistrationService.getRegistrationLink(userType);
    this.hideRegistrationLink = true;
    this.hideAll();
  }
}
