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
  hideRegistrationLink = false;
  registrationLink: string;

  constructor(private apiService: ApiService) {
    this.generateRegisterLink();
  }

  ngOnInit(): void {
  }

  getRegistratonLink(){
    this.hideRegisterButton = false;
    this.hideRegistrationLink = true;
    this.registrationLink = this.apiService.getRegistrationLink();
  }

  generateRegisterLink() {
    console.log(this.apiService.newAccountRegistrationLink({userType: 'WORKER'})); // .subscribe(data => { this.data = data; });

      // .pipe(
        // tap(registerLink => this.data = registerLink),
        // mapTo(true),
        // catchError(error => {
        //   alert(error.error);
        //   return of(false);
        // }));
    // .subscribe((url) => {
      // this.data = url;
    // });
    // console.log('Co zas: ', this.data);
  }
}
