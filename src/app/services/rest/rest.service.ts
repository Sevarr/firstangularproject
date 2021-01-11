import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  public getEmployeeData(id){
    return this.httpClient.get('http://localhost:8080/workers/' + id);
  }

  public sendEmployeeData(id, data){
    return this.httpClient.post('http://localhost:8080/workers/update' + id, data);
  }
}
