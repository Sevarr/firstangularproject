import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private httpClient: HttpClient) { }

  // Get corrent user data from database by id
  public getEmployeeData(id){
    const urlAddres = ('http://localhost:8080/workers/' + id);
    return this.httpClient.get(urlAddres);
  }

  // Send corrent user data to database by id
  public sendEmployeeData(id, data){
    return this.httpClient.put('http://localhost:8080/workers/update/' + id, data);
  }
}
