import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {
  }
  public isCollapsed = true;
  pressed = false;


  ngOnInit(): void {
  }

  candidateForm(){
    console.log('działa');
    // window.alert('Działa');
    this.pressed = true;
    // '<app-candidate-form></app-candidate-form>'         // ['/file_download']);     // ['<app-candidate-form></app-candidate-form>']);

  }
}
