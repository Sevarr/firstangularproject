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
  }

  load() {
    this.backendUrl = config.backend_url;
  }

  // Get corrent user data from database by id
  public getEmployeeData(id){
    const url = (this.backendUrl + '/workers/' + id);
    return this.httpClient.get(url);
    //  return this.httpClient.get('http://localhost:8080/workers/' + id);
  }

  // Send corrent user data to database by id
  public sendEmployeeData(id, data){
    const url = (this.backendUrl + '/workers/update/' + id);
    return this.httpClient.put(url, data);
    // return this.httpClient.put('http://localhost:8080/workers/update/' + id, data);
  }

  public getFile(name){
    const url = (this.backendUrl + '/');
    return this.httpClient.get(url);
  }

  public sendFile(file){
    const url = (this.backendUrl + '/uploadfiles/');
    console.log('Poszedł plik do bazy');
    return this.httpClient.post(url, file);
  }

}
