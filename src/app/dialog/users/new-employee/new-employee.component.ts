import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../../../services/data/employee-data.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  public hideCandidateForm = false;
  public hideEmployeeForm = false;
  public hideDocumentGenerator = false;
  public hideChangeAccountData = false;

  constructor(private employeeData: EmployeeDataService) { }

  ngOnInit(): void {
  }

  loadCandidateForm(){
    if (this.hideCandidateForm){
      this.hideCandidateForm = false;
    } else {
      this.hideCandidateForm = true;
      this.hideEmployeeForm = false;
    }
  }
  loadEmployeeForm(){
    if (this.hideEmployeeForm){
      this.hideEmployeeForm = false;
    } else {
      this.hideEmployeeForm = true;
      this.hideCandidateForm = false;
    }
  }

  loadChangeAccountData() {
    if (this.hideChangeAccountData){
      this.hideChangeAccountData = false;
    } else {
      this.hideChangeAccountData = true;
    }
  }

  loadDokumentGenerator() {
    if (this.hideDocumentGenerator){
      this.hideDocumentGenerator = false;
    } else {
      this.hideDocumentGenerator = true;
    }
  }
}
