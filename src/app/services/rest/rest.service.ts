import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {HomeComponent} from '../../home/home.component';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  public backendUrl;
  constructor(private httpClient: HttpClient) { }

  // Get corrent user data from database by id
  public getEmployeeData(id){
    // return this.httpClient.get(this.backendUrl + '/workers/' + id);
     return this.httpClient.get('http://localhost:8080/workers/' + id);
  }

  // Send corrent user data to database by id
  public sendEmployeeData(id, data){
    // return this.httpClient.put(this.backendUrl + '/workers/update/' + id, data);
    return this.httpClient.put('http://localhost:8080/workers/update/' + id, data);
  }
}
