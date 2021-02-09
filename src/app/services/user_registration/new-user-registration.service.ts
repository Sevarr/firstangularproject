import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class NewUserRegistrationService {

  constructor(private apiService: ApiService) { }

  registerUser(registrationLink, credentials) {
    this.apiService.newUserRegistration(registrationLink, credentials);
  }
}
