import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../../../services/data/employee-data.service';

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

  constructor(private employeeData: EmployeeDataService) { }

  ngOnInit(): void {
  }

  loadCandidateForm(){
    if (this.hideCandidateForm){
      this.hideCandidateForm = false;
      this.hideAll = true;
    } else {
      this.hideCandidateForm = true;
      this.hideEmployeeForm = false;
      this.hideAll = false;
    }
  }
  loadEmployeeForm(){
    if (this.hideEmployeeForm){
      this.hideEmployeeForm = false;
      this.hideAll = true;
    } else {
      this.hideEmployeeForm = true;
      this.hideCandidateForm = false;
      this.hideAll = false;
    }
  }

  // loadDokumentGenerator() {
  //   if (this.hideDocumentGenerator){
  //     this.hideDocumentGenerator = false;
  //     this.hideAll = true;
  //   } else {
  //     this.hideDocumentGenerator = true;
  //     this.hideAll = false;
  //   }
  // }

  loadFileDownload() {
    if (this.hideFileDownload){
      this.hideFileDownload = false;
      this.hideAll = true;
    } else {
      this.hideFileDownload = true;
      this.hideAll = false;
    }
  }

  goBack(){
    this.hideAll = true;
    this.hideCandidateForm = false;
    this.hideEmployeeForm = false;
    this.hideDocumentGenerator = false;
    this.hideFileDownload = false;
  }


}
