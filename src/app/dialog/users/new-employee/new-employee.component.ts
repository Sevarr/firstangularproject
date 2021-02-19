import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  public hideAll = true;
  public hideCandidateForm = false;
  public hideEmployeeForm = false;
  public hideDocumentGenerator = false;
  public hideFileDownload = false;

  constructor() { }

  ngOnInit(): void {
  }

  loadCandidateForm(): any {
    if (this.hideCandidateForm){
      this.hideCandidateForm = false;
      this.hideAll = true;
    } else {
      this.hideCandidateForm = true;
      this.hideEmployeeForm = false;
      this.hideAll = false;
    }
  }

  loadEmployeeForm(): any {
    if (this.hideEmployeeForm){
      this.hideEmployeeForm = false;
      this.hideAll = true;
    } else {
      this.hideEmployeeForm = true;
      this.hideCandidateForm = false;
      this.hideAll = false;
    }
  }

  loadFileDownload(): any {
    if (this.hideFileDownload){
      this.hideFileDownload = false;
      this.hideAll = true;
    } else {
      this.hideFileDownload = true;
      this.hideAll = false;
    }
  }

  goBack(): any {
    this.hideAll = true;
    this.hideCandidateForm = false;
    this.hideEmployeeForm = false;
    this.hideDocumentGenerator = false;
    this.hideFileDownload = false;
  }
}
