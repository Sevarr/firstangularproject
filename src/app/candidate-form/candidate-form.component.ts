import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']

})
export class CandidateFormComponent implements OnInit {
  personalDataForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.initializePersonalDataForm();
  }

  onSubmit() {
    console.log(this.personalDataForm.value);
  }

  onClear() {}

  private initializePersonalDataForm() {
    this.personalDataForm = new FormGroup({
      name: new FormControl(null),
      secondName: new FormControl(null),
      surname: new FormControl(null)
    });
  }

}
