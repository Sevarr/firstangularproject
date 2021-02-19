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
  private adminRegistrationLink: string;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.getFileNames();
  }

  getUserType(): string {
    return this.authService.getUserType();
  }

  getUserEmail(): string {
    return this.authService.getUserEmail();
  }

  getUserToken(): any {
    return this.authService.getJwtToken();
  }

  getUserRegistrationLink(userType): string {
    this.generateUserRegistrationLink(userType);
    const link = this.registrationLink.split('register/');
    this.registrationLink = link[1];
    return this.registrationLink;
  }

  private generateUserRegistrationLink(userType): any {
    this.httpClient.post(config.backend_url + '/generatelink', { userType },
        {responseType: 'text', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
        .subscribe(response => this.registrationLink = response);
  }

  getAdminRegistrationLink(): string {
    this.generateAdminRegistrationLink('ADMIN');
    console.log(this.adminRegistrationLink);
    const link = this.adminRegistrationLink.split('register/');
    this.adminRegistrationLink = link[1];
    return this.adminRegistrationLink;
  }

  private generateAdminRegistrationLink(userType): any {
    this.httpClient.post(config.backend_url + '/generatelinkadmin', { userType },
      {responseType: 'text', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(response => this.adminRegistrationLink = response);
      }

  public newUserRegistration(registerLink, user): any {
    this.httpClient.post<any>(config.backend_url + `/register/` + registerLink, {email: user.email, password: user.password})
      .subscribe(response => alert(response));
  }

  // Get corrent user data from database by id
  public getEmployeeData(token, userType): any {
    return this.httpClient.get<any>(config.backend_url + '/' + userType,
      {headers: new HttpHeaders().set('Authorization', token),
      });
  }

  // Send corrent user data to database by id
  public sendEmployeeData(token, data): any {
    return this.httpClient.put<any>(config.backend_url + '/updatecandidate', data);
  }

  public sendWorkerData(token, data): any {
    return this.httpClient.put<any>(config.backend_url + '/updateworker', data);
  }

  public getFileList(): string {
    if (this.fileNames != null) {
      this.getFileNames();
      this.fileNames = this.fileNames.slice(2, (length - 2));
      return this.fileNames.split('","');
    } else {
      return this.fileNames;
    }
  }

  private getFileNames(): any {
    this.httpClient.get(config.backend_url + '/downloadfilenames',
      {responseType: 'text', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(fileNames => this.fileNames = fileNames);
  }

  deleteFile(fileName): object {
    this.httpClient.delete(config.backend_url + '/deletefile/' + fileName,
      {headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(
        response => (this.file = response));
    return this.file;
  }

  downloadFile(fileName): object {
    this.httpClient.get(config.backend_url + '/downloadfile/' + fileName,
      {responseType: 'blob', headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(
        response => (this.file = response));
    return this.file;
  }

  sendFile(file): object {
    const formData = new FormData();
    formData.set('files', file);
    return this.httpClient.post<any>(config.backend_url + '/uploadfiles/1', formData,
      {headers: new HttpHeaders().set('Authorization', this.authService.getJwtToken())})
      .subscribe(response => alert(response));
  }

  changePassword(email, passwordDataForm): any {
    this.httpClient.put<any>(config.backend_url + `/changepassword`, {email, password: passwordDataForm.value.password,
      newPassword: passwordDataForm.value.newPassword}, {headers: new HttpHeaders().set('Authorization',
        this.authService.getJwtToken())}).subscribe(response => alert(response));
  }
}
