import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import config from '../../../assets/config.json';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  public backendUrl;
  constructor(private httpClient: HttpClient) {
    this.load();
    console.log('Konstruktor :', config);
  }

  load() {
    this.backendUrl = config.backend_url;
    console.log(config.backend_url);
  }

  // Get corrent user data from database by id
  public getEmployeeData(id){
    let url = (this.backendUrl + '/workers/' + id);
    console.log(this.backendUrl);
    return this.httpClient.get(url);
    //  return this.httpClient.get('http://localhost:8080/workers/' + id);
  }

  // Send corrent user data to database by id
  public sendEmployeeData(id, data){
    // return this.httpClient.put(this.backendUrl + '/workers/update/' + id, data);
    return this.httpClient.put('http://localhost:8080/workers/update/' + id, data);
  }
}
