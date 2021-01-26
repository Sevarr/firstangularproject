import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-account-data',
  templateUrl: './change-account-data.component.html',
  styleUrls: ['./change-account-data.component.css']
})
export class ChangeAccountDataComponent implements OnInit {
  accountType = this.authService.getUserType();
  passwordDataForm: FormGroup;
  private response;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initializePasswordDataForm();
  }

  initializePasswordDataForm(){
    this.passwordDataForm = new FormGroup({
      oldPassword: new FormControl(null),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

  changePassword(){
    this.response = this.authService.changePassword(this.passwordDataForm);
  }


}
