import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewUserRegistrationService } from '../../../services/user_registration/new-user-registration.service';

@Component({
  selector: 'app-register-new-account',
  templateUrl: './register-new-account.component.html',
  styleUrls: ['./register-new-account.component.css']
})
export class RegisterNewAccountComponent implements OnInit {

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
    console.log('poszlo');
    console.log(this.newUserRegistrationService.registerUser(this.userDataForm.value.registrationLink,
      this.userDataForm.value.email, this.userDataForm.value.password));
  }
}
