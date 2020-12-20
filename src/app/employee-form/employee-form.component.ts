import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeDataForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.initializeEmployeeDataForm();
  }

  private initializeEmployeeDataForm() {
    this.employeeDataForm = new FormGroup({
      pesel: new FormControl(null),
      nip: new FormControl(null),
      city: new FormControl(null),
      postcode: new FormControl(null),
      community: new FormControl(null),
      county: new FormControl(null),
      street: new FormControl(null),
      houseNumber: new FormControl(null),
      apartmentNumber: new FormControl(null),
      taxOffice: new FormControl(null),
      citizenship: new FormControl(null),
      personToNotfiy: new FormControl(null),
      position: new FormControl(null),
      department: new FormControl(null),
      nfz: new FormControl(null),
      bankName: new FormControl(null),
      bankAccount: new FormControl(null)
    });
  }

  onSubmit(){}
}
