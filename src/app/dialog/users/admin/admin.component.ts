import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  hideAll = true;
  hideCreateNewAccount = false;
  hideUploadFiles = false;
  hideDownloadFiles = false;

  constructor() { }

  ngOnInit() {
  }


  loadCreateNewAccount() {
    if (this.hideCreateNewAccount){
      this.hideCreateNewAccount = false;
      this.hideAll = true;
    } else {
      this.hideCreateNewAccount = true;
      this.hideAll = false;
    }
  }

  loadUploadFiles(){
    if (this.hideUploadFiles){
      this.hideUploadFiles = false;
      this.hideAll = true;
    } else {
      this.hideUploadFiles = true;
      this.hideAll = false;
    }
  }

  loadDownloadFiles(){
    if (this.hideDownloadFiles){
      this.hideDownloadFiles = false;
      this.hideAll = true;
    } else {
      this.hideDownloadFiles = true;
      this.hideAll = false;
    }
  }

  goBack(){
    this.hideAll = true;
    this.hideCreateNewAccount = false;
    this.hideUploadFiles = false;
    this.hideDownloadFiles = false;
  }

}
