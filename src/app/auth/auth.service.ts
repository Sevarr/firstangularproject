import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from '../../assets/config';
// import { EmployeeDataService} from '../services/data/employee-data.service';
// import { Tokens } from './tokens';


interface Tokens {
  href: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  // private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;
  private userType: string;

  constructor(
    private httpClient: HttpClient
    // public employeeDataService: EmployeeDataService
  ) {}

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.httpClient.post<any>(config.backend_url + `/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    this.doLogoutUser();
    // localStorage.clear();
    // return this.httpClient.post<any>(config.backend_url + `/logout`, {
    //   refreshToken: this.getRefreshToken()
    // }).pipe(
    //   tap(() => this.doLogoutUser()),
    //   mapTo(true),
    //   catchError(error => {
    //     alert(error.error);
    //     return of(false);
    //   }));
  }

  isLoggedIn() {
    if (!this.userType){
      this.doLogoutUser();
    }
    return !!this.getJwtToken();
  }

  // refreshToken() {
  //   return this.httpClient.post<any>(config.backend_url + `/refresh`, {
  //     refreshToken: this.getRefreshToken()
  //   }).pipe(tap((tokens: Tokens) => {
  //     this.storeJwtToken(tokens.jwt);
  //   }));
  // }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getUserType(){
    // console.log('User type: ', this.userType);
    return this.userType;
  }

  private doLoginUser(email: string, tokens: Tokens) {
    this.userType = tokens.href.split('/')[3];
    this.loggedUser = email;
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.userType = null;
    this.removeTokens();
  }

  // private getRefreshToken() {
  //   return localStorage.getItem(this.REFRESH_TOKEN);
  // }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeTokens(tokens: Tokens) {
    console.log('JWT: ', tokens.token);
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    // localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  // Usunięcie tokenu użytkownika z pamięci
  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    // localStorage.removeItem(this.REFRESH_TOKEN);
  }

  // Komunikacja z backendem celem zmiany hasła
  changePassword(passwordDataForm) {

  }
}

