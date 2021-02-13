import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class NewUserRegistrationService {
  loggedUserType: string;

  constructor(private apiService: ApiService) { }

  getLoggedUserType(): any{
    return this.apiService.getUserType();
  }

  getRegistrationLink(userType): string{
    if (userType === 'ADMIN'){
      return this.apiService.getAdminRegistrationLink();
    } else {
      return this.apiService.getUserRegistrationLink(userType);
    }
  }

  registerUser(registrationLink, credentials): any {
    this.apiService.newUserRegistration(registrationLink, credentials);
  }
}
