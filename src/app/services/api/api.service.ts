import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../../assets/config';
import { AuthService } from '../../auth/auth.service';
import {Observable, of} from 'rxjs';
import {catchError, mapTo, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class ApiService {
  // public backendUrl;
  private data: any;
  private fileNames: string;
  constructor(private httpClient: HttpClient, private authService: AuthService) {
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

  newAccountRegistrationLink(userType: { userType: string }){
    return this.httpClient.post(config.backend_url + '/generatelink', userType,
      {responseType: 'text', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(data => this.data = data);
    }

    public registrationLink(registerLink){
      console.log('poszło tutaj: ', registerLink);
    }

  // Get corrent user data from database by id
  public getEmployeeData(token, userType){
    return this.httpClient.get<any>(config.backend_url + '/' + this.userTypeDebug,
      {headers: new HttpHeaders().set('Authorization', token)});

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
    console.log('Poszedł plik do bazy');
    return this.httpClient.post<any>(config.backend_url + '/uploadfiles/1',
      {headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(data => console.log(data));

    // console.log(this.httpClient.post<any>(config.backend_url + '/uploadfiles/1',
    //   {headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())}));
  }

  public getFileList() {
    this.httpClient.get(config.backend_url + '/downloadfilenames',
      {responseType: 'text', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(fileNames => this.fileNames = fileNames);
    return this.fileNames;
  }

  downloadFile(fileNames){
    this.httpClient.get(config.backend_url + '/downloadfilenames',
      {responseType: 'text', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(data => this.data = data);
    return this.data;
  }
}
