import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/api/auth.service';
import { Router } from '@Angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeeDataService } from '../services/data/employee-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isCollapsed = true;
  pressed = false;
  userType;

  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private employeService: EmployeeDataService) {
    this.userType = this.authService.getUserType();
  }

  ngOnInit(): void {
  }

  logout(): any {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
