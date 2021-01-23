import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { config } from '../../../assets/config';
import {Observable, of} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestService {
  public backendUrl;
  constructor(private httpClient: HttpClient) {
    // this.load();
  }
  userTypeDebug = 'worker';
  // load() {
  //   this.backendUrl = config.backend_url;
  // }

  // login(user: { username: string, password: string }): Observable<boolean> {
  //   return this.http.post<any>(config.backend_url + `/login`, user)
  //     .pipe(
  //       tap(tokens => this.doLoginUser(user.username, tokens)),
  //       mapTo(true),
  //       catchError(error => {
  //         alert(error.error);
  //         return of(false);
  //       }));
  // }

  newAccountRegistrationLink(userType){
      return this.httpClient.post<any>(config.backend_url + `/generatelink`, userType);
        // .pipe(
        //   tap(registerLink => this.registrationLink(registerLink)),
        //   mapTo(true),
        //   catchError(error => {
        //     alert(error.error);
        //     return of(false);
        //   }));
    }

    public registrationLink(registerLink){
      console.log('poszło tutaj: ', registerLink);
    }

  // Get corrent user data from database by id
  public getEmployeeData(token, userType){
    return this.httpClient.get<any>(config.backend_url + '/' + this.userTypeDebug, {headers: new HttpHeaders().set('Authorization', token)});

    // const url = (config.backend_url + '/workers/' + id);
    // return this.httpClient.get(url);
    //  return this.httpClient.get('http://localhost:8080/workers/' + id);
  }

  // Send corrent user data to database by id
  public sendEmployeeData(token, data){
    // console.log('Wysyłane data: ', data);
    // return this.httpClient.put<any>(config.backend_url + '/updatecandidate', {headers: new HttpHeaders().set('Authorization', token)}, data);
    return this.httpClient.put<any>(config.backend_url + '/updatecandidate', data);
  }

  public getFile(name){
    const url = (config.backend_url + '/');
    return this.httpClient.get(url);
  }

  public sendFile(file){
    const url = (config.backend_url + '/uploadfiles/');
    console.log('Poszedł plik do bazy');
    return this.httpClient.post(url, file);
  }

}
