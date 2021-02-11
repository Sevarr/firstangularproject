import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../../../assets/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private data: any;
  private fileNames = null;
  private file = null;
  private registrationLink: string;
  // private workerRegistrationLink: string;
  // private hrEmployeeRegistrationLink: string;
  private adminRegistrationLink: string;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.getFileNames();
  }

  getUserType(){
    return this.authService.getUserType();
  }

  getUserEmail() {
    return this.authService.getUserEmail();
  }

  getUserRegistrationLink(userType){
    this.generateUserRegistrationLink(userType);
    const link = this.registrationLink.split('register/');
    this.registrationLink = link[1];
    return this.registrationLink;
  }

  private generateUserRegistrationLink(userType){
    this.httpClient.post(config.backend_url + '/generatelink', { userType },
        {responseType: 'text', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
        .subscribe(response => this.registrationLink = response);
  }

  getAdminRegistrationLink() {
    this.generateAdminRegistrationLink('ADMIN');
    console.log(this.adminRegistrationLink);
    const link = this.adminRegistrationLink.split('register/');
    this.adminRegistrationLink = link[1];
    return this.adminRegistrationLink;
  }

  private generateAdminRegistrationLink(userType) {
    this.httpClient.post(config.backend_url + '/generatelinkadmin', { userType },
      {responseType: 'text', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(response => this.adminRegistrationLink = response);
      }

  public newUserRegistration(registerLink, user) {
    console.log(user);
    this.httpClient.post<any>(config.backend_url + `/register/` + registerLink, {email: user.email, password: user.password})
      .subscribe(response => console.log(response),
        (error => console.log(error)));
  }

  // Get corrent user data from database by id
  public getEmployeeData(token, userType) {
    return this.httpClient.get<any>(config.backend_url + '/' + userType,
      {headers: new HttpHeaders().set('Authorization', token)});
  }

  // Send corrent user data to database by id
  public sendEmployeeData(token, data) {
    // console.log('Wysyłane data: ', data);
    // return this.httpClient.put<any>(config.backend_url + '/updatecandidate', {headers: new HttpHeaders().set('Authorization', token)}, data);
    return this.httpClient.put<any>(config.backend_url + '/updatecandidate', data);
  }

  public sendWorkerData(token, data) {
    return this.httpClient.put<any>(config.backend_url + '/updateworker', data);
  }

  public getFile(name) {
    const url = (config.backend_url + '/');
    return this.httpClient.get(url);
  }

  public sendFile(file) {
    const formData = new FormData();
    formData.set('files', file);
    return this.httpClient.post<any>(config.backend_url + '/uploadfiles/1', formData,
      {headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(response => console.log(response),
        (error => console.log(error)));
  }

  public getFileList() {
    if (this.fileNames != null) {
      this.getFileNames();
      this.fileNames = this.fileNames.slice(2, (length - 2));
      return this.fileNames.split('","');
    } else {
      return this.fileNames;
    }
  }

  private getFileNames() {
    this.httpClient.get(config.backend_url + '/downloadfilenames',
      {responseType: 'text', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(fileNames => this.fileNames = fileNames);
  }


  downloadFile(fileName) {
    // file;
    this.httpClient.get(config.backend_url + '/downloadfile/' + fileName,
      {responseType: 'blob', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(
        response => (this.file = response),
        error => console.log(error));
    console.log('Pobrany plik ', this.file);
    return this.file;
  }

  // Komunikacja z backendem celem zmiany hasła
  changePassword(email, passwordDataForm) {
    console.log(passwordDataForm);
    this.httpClient.put<any>(config.backend_url + `/changepassword`, {email, password: passwordDataForm.value.password,
      newPassword: passwordDataForm.value.newPassword}, {headers: new HttpHeaders().set('Authorization',
        this.authService.getJwtToken())}).subscribe(response => console.log(response),
        (error => console.log(error)));
  }
}
