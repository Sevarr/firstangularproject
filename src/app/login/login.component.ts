import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../auth/auth.service';

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
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.authService.login(
      {
        username: this.f.username.value,
        password: this.f.password.value
      }
    )
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/secret-random-number']);
        }
      });
  }
}







//   // constructor(private Auth: AuthService,
//   //             private router: Router) { }
//
//   // constructor(private Auth: AuthService) {
//   // }
//   constructor() {
//   }
//
//   ngOnInit() {
//   }
//
//   loginUser(event) {
//     event.preventDefault();
//     const target = event.target;
//     const username = target.querySelector('#username').value;
//     const password = target.querySelector('#password').value;
//     console.log(event);
//     console.log(username, password);
//
//     // this.Auth.getUserDetails(username, password);
//   }
//
//   // event.preventDefault()
//   // const target = event.target
//   // const username = target.querySelector('#username').value
//   // const password = target.querySelector('#password').value
//   //
//   // this.Auth.getUserDetails(username, password).subscribe(data => {
//   //   if(data.success) {
//   //     this.router.navigate(['admin'])
//   //     this.Auth.setLoggedIn(true)
//   //   } else {
//   //     window.alert(data.message)
//   //   }
//   // })
//   //   console.log(event)
//   // }
//
// }
