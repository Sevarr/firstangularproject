import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/api/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  login() {
    this.authService.login(
      {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
    )
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/home']);
        }
      });
  }
}
