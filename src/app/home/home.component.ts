import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@Angular/router';
import { HttpClient } from '@angular/common/http';
// import { EmployeeDataService } from '../services/data/employee-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public isCollapsed = true;
  pressed = false;
  // jwt = this.authService.getJwtToken();
  // userType = this.authService.getUserType();
  userType; // : string[] = ['admin', 'worker', 'hr_employee'];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { // , private employeeData: EmployeeDataService) {
    // this.employeeData.get();
    this.userType = this.authService.getUserType();
    // if (this.userType === 'WORKER'){
    //   this.getFromDatabase();
    // }
    // console.log('Dane pobrane w home: ', this.employeeData.get());
  }


  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    // if (this.userType === 'WORKER'){
    //  this.employeeData.clearEmployee();
    // }
      // .subscribe(success => {
      //   if (success) {
    this.router.navigate(['/login']);
        // }
      // });
  }

  getFromDatabase(){
    // this.employeeData.get();
    // this.employee = this.employeeData.getCandidate();
  }

  candidateForm(){
    this.pressed = true;
  }
}
