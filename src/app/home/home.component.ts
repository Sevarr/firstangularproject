import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../services/data/employee-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private employeeData: EmployeeDataService) {
    // this.employeeData.getData('570b40dd-807b-4c3e-a834-e09f1d72480b');
  }

  ngOnInit(): void {
  }
}
