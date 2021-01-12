import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../services/data/employee-data.service';
import {RestService} from '../services/rest/rest.service';
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import config from '../../assets/config.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public backendUrl;
  constructor(private employeeData: EmployeeDataService, private restService: RestService, private http: HttpClient) {
    // this.employeeData.getData('570b40dd-807b-4c3e-a834-e09f1d72480b');
    this.load();
  }

  load() {

    this.restService.backendUrl = config.backend_url;
    console.log(config.backend_url);
  }

  ngOnInit(): void {
  }
}
