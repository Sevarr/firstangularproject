import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-change-account-data',
  templateUrl: './change-account-data.component.html',
  styleUrls: ['./change-account-data.component.css']
})
export class ChangeAccountDataComponent implements OnInit {
  accountTypeTranslate = this.getUserType();
  passwordDataForm: FormGroup;
  private response;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.initializePasswordDataForm();
  }

  initializePasswordDataForm(): any{
    this.passwordDataForm = new FormGroup({
      password: new FormControl(null),
      newPassword: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

  getUserType(){
    const accountType = this.apiService.getUserType();
    if (accountType === 'admin'){
      return 'Administrator';
    } else if (accountType === 'hr_employee') {
      return 'Pracownik kadr';
    } else {
      return 'Kandydat/Pracownik';
    }
  }

  changePassword(): any {
    this.response = this.apiService.changePassword(this.apiService.getUserEmail(), this.passwordDataForm);
  }
}
