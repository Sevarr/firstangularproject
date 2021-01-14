import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
// @ts-ignore
import { config } from '../../assets/config.json';
import { Tokens } from './tokens';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {}

  login(user: { username: string, password: string }): boolean { // Observable<boolean> {
    return true;
    // return this.http.post<any>(`${config.backend_url}/login`, user)
    //   .pipe(
    //     tap(tokens => this.doLoginUser(user.username, tokens)),
    //     mapTo(true),
    //     catchError(error => {
    //       alert(error.error);
    //       return of(false);
    //     }));
  }

  // tslint:disable-next-line:typedef
  logout() {
    return true;
    // return this.http.post<any>(`${config.backend_url}/logout`, {
    //   'refreshToken': this.getRefreshToken()
    // }).pipe(
    //   tap(() => this.doLogoutUser()),
    //   mapTo(true),
    //   catchError(error => {
    //     alert(error.error);
    //     return of(false);
    //   }));
  }

  // tslint:disable-next-line:typedef
  isLoggedIn() {
    return !!this.getJwtToken();
  }

  // tslint:disable-next-line:typedef
  refreshToken() {
    return true;
    // return this.http.post<any>(`${config.backend_url}/refresh`, {
    //   'refreshToken': this.getRefreshToken()
    // }).pipe(tap((tokens: Tokens) => {
    //   this.storeJwtToken(tokens.jwt);
    // }));
  }

  // tslint:disable-next-line:typedef
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  // tslint:disable-next-line:typedef
  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  // tslint:disable-next-line:typedef
  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  // tslint:disable-next-line:typedef
  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  // tslint:disable-next-line:typedef
  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  // tslint:disable-next-line:typedef
  private storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  // tslint:disable-next-line:typedef
  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}

