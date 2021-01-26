import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  hideCreateNewAccount = false;

  constructor() { }


  ngOnInit() {
  }


  loadCreateNewAccount() {
    if (this.hideCreateNewAccount){
      this.hideCreateNewAccount = false;
    } else {
      this.hideCreateNewAccount = true;
    }
  }
}
