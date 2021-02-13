import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from '../../../assets/config';

interface Tokens {
  href: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;
  private userType: string;
  private email: string;

  constructor(
    private httpClient: HttpClient
  ) {}

  login(user: { email: string, password: string }): Observable<boolean> {
    this.email = user.email;
    return this.httpClient.post<any>(config.backend_url + `/login`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout(): any {
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

  isLoggedIn(): any {
    if (!this.userType){
      this.doLogoutUser();
    }
    return !!this.getJwtToken();
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getUserType(): string {
    return this.userType;
  }

  getUserEmail(): string {
    return this.email;
  }

  private doLoginUser(email: string, tokens: Tokens): any {
    this.userType = tokens.href.split('/')[3];
    this.loggedUser = email;
    this.storeTokens(tokens);
  }

  private doLogoutUser(): any {
    this.loggedUser = null;
    this.userType = null;
    this.removeTokens();
  }

  // private storeJwtToken(jwt: string): any {
  //   localStorage.setItem(this.JWT_TOKEN, jwt);
  // }

  private storeTokens(tokens: Tokens): any {
    console.log('JWT: ', tokens.token);
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
  }

  private removeTokens(): any {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}

