import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import {catchError, mapTo, tap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.css']
})
export class CreateNewAccountComponent implements OnInit {
  private data: any;
  hideRegisterButton = true;
  hideWorkerRegistrationLink = false;
  hideHREmployeeRegistrationLink = false;
  hideAdminRegistrationLink = false;
  registrationLink: string;

  constructor(private apiService: ApiService) {
    this.generateRegisterLink();
  }

  ngOnInit(): void {
  }

  getRegistratonLink(){
    this.hideRegisterButton = false;
    this.hideWorkerRegistrationLink = true;
    this.registrationLink = this.apiService.getWorkerRegistrationLink();
  }

  generateRegisterLink() {
    console.log(this.apiService.newWorkerRegistrationLink());
    // @ts-ignore
    if (this.apiService.getUserType === ('ADMIN')) {
      console.log(this.apiService.newHREmployeeRegistrationLink());
      console.log(this.apiService.newAdminRegistrationLink());
    }
  }

  generateAdminRegisterLink(){
    console.log(this.apiService.newAdminRegistrationLink());
  }

  getAdminRegistratonLink() {
    console.log(this.apiService.getAdminRegistrationLink());
  }

  getWorkerRegistratonLink() {
    console.log(this.apiService.newWorkerRegistrationLink());
  }

  getHREmployeeRegistratonLink() {
    console.log(this.apiService.newHREmployeeRegistrationLink());
  }
}
