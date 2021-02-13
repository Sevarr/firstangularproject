import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-employee',
  templateUrl: './hr-employee.component.html',
  styleUrls: ['./hr-employee.component.css']
})
export class HREmployeeComponent implements OnInit {
  hideAll = true;
  hideCreateNewAccount = false;

  constructor() { }

  ngOnInit(): void {
  }

  loadCreateNewAccount(): any {
    if (this.hideCreateNewAccount){
      this.hideCreateNewAccount = false;
      this.hideAll = true;
    } else {
      this.hideCreateNewAccount = true;
      this.hideAll = false;
    }
  }

  goBack(): any{
    this.hideAll = true;
    this.hideCreateNewAccount = false;
  }
}
