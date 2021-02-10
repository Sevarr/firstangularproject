import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-change-account-data',
  templateUrl: './change-account-data.component.html',
  styleUrls: ['./change-account-data.component.css']
})
export class ChangeAccountDataComponent implements OnInit {
  accountType = this.apiService.getUserType();
  passwordDataForm: FormGroup;
  private response;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.initializePasswordDataForm();
  }

  initializePasswordDataForm(){
    this.passwordDataForm = new FormGroup({
      password: new FormControl(null),
      newPassword: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

  changePassword(){
    this.response = this.apiService.changePassword(this.apiService.getUserEmail(), this.passwordDataForm);
  }


}
