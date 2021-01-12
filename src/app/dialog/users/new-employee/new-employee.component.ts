import { Component, OnInit } from '@angular/core';
import {EmployeeDataService} from '../../../services/data/employee-data.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  constructor(private employeeData: EmployeeDataService) { }

  ngOnInit(): void {
  }

}
