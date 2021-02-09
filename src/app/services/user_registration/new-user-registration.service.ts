import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class NewUserRegistrationService {

  constructor(private apiService: ApiService) { }

  registerUser(registrationLink, email, password) {
    this.apiService.newUserRegistration(registrationLink, email, password);
  }
}
