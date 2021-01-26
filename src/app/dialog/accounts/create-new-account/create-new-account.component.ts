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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  }

  generateRegisterLink() {
    console.log('Testuje');
    this.apiService.newAccountRegistrationLink({userType: 'WORKER'}).subscribe(data => { this.data = data; });
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
    console.log('Co zas: ', this.data);
  }
}
