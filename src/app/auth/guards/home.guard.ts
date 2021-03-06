import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../../services/api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): any {
    return this.canLoad();
  }

  canLoad(): any {
    if (!this.authService.isLoggedIn()) {
      if (!this.authService.getUserType()) {
      this.router.navigate(['/login']);
      }
    }
    return this.authService.isLoggedIn();
  }

}
