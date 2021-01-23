import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../services/api/rest.service';

@Component({
  selector: 'app-create-new-account',
  templateUrl: './create-new-account.component.html',
  styleUrls: ['./create-new-account.component.css']
})
export class CreateNewAccountComponent implements OnInit {

  constructor(private restService: RestService) { this.generateRegisterLink(); }

  ngOnInit(): void {
  }

  generateRegisterLink(){
    console.log('Testuje');
    console.log(this.restService.newAccountRegistrationLink('WOKER'));

  }

}
