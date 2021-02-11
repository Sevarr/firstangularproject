import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NewUserRegistrationService } from '../../../services/user_registration/new-user-registration.service';

const credentials = {
  email: null,
  password: null
};

@Component({
  selector: 'app-register-new-account',
  templateUrl: './register-new-account.component.html',
  styleUrls: ['./register-new-account.component.css']
})
export class RegisterNewAccountComponent implements OnInit {

  private credentials = credentials;
  userDataForm: FormGroup;

  constructor(private newUserRegistrationService: NewUserRegistrationService) { }

  ngOnInit(): void {
    this.initializeUserDataForm();
  }

  private initializeUserDataForm() {
    this.userDataForm = new FormGroup({
      registrationLink: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null)
    });
  }

  onSubmit() {
    this.credentials.email = this.userDataForm.value.email;
    this.credentials.password = this.userDataForm.value.password;
    console.log(this.newUserRegistrationService.registerUser(this.userDataForm.value.registrationLink,
      this.credentials));
  }
}
