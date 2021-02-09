import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../../assets/config';
import { AuthService } from '../../auth/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private data: any;
  private fileNames = null;
  private file = null;
  private registrationLink: string;
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.getFileNames();
  }
  userTypeDebug = 'worker';

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
    this.httpClient.post(config.backend_url + '/generatelink', userType,
      {responseType: 'text', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe( response => this.registrationLink = response);
    }

    getRegistrationLink(){
    const link = this.registrationLink.split('register/');
    this.registrationLink = link[1];
    return this.registrationLink;
    }

    public newUserRegistration(registerLink, user: { email: string; password: string }, password) {
      this.httpClient.post<any>(config.backend_url + `/register/` + registerLink, user)
        .subscribe(response => console.log(response),
          (error => console.log(error)));
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
    const formData = new FormData();
    formData.set('files', file);
    console.log('tuuuu: ', file);
    return this.httpClient.post<any>(config.backend_url + '/uploadfiles/1', formData,
      {headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(response => console.log(response),
        (error => console.log(error)));

    // console.log(this.httpClient.post<any>(config.backend_url + '/uploadfiles/1',
    //   {headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())}));
  }

  public getFileList(){
    if (this.fileNames != null) {
      this.getFileNames();
      this.fileNames = this.fileNames.slice(2, (length - 2));
      return this.fileNames.split('","');
    } else {
      return this.fileNames;
    }
  }
  private getFileNames() {
    // let list;
    // if (!this.fileNames) {
      this.httpClient.get(config.backend_url + '/downloadfilenames',
        {responseType: 'text', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
        .subscribe(fileNames => this.fileNames = fileNames);
    // }
        // error => console.log(error));
    // if (list !== undefined) {
    //   this.fileNames = list; // .split('","');
    // }
    // console.log('Pobrane z bazy nazwy plików: ', this.fileNames);
  }


  downloadFile(fileName){
    // file;
    this.httpClient.get(config.backend_url + '/downloadfile/' + fileName,
      {responseType: 'blob', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(
        response => (this.file = response),
          error => console.log(error));
    console.log('Pobrany plik ', this.file);
    return this.file;
  }
}
