import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@Angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }
  public isCollapsed = true;
  pressed = false;
  // jwt = this.authService.getJwtToken();
  // userType = this.authService.getUserType();

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
      // .subscribe(success => {
      //   if (success) {
    this.router.navigate(['/login']);
        // }
      // });
  }

  candidateForm(){
    console.log('działa');
    // window.alert('Działa');
    this.pressed = true;
    // '<app-candidate-form></app-candidate-form>'         // ['/file_download']);     // ['<app-candidate-form></app-candidate-form>']);

  }
}
