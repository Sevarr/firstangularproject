import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})

export class CandidateFormComponent implements OnInit {

  sortOrders: string[] = ['Mężczyzna', 'Kobieta', 'Inne'];
  selectedSortOrder = 'Wybierz płeć';
  personalDataForm: FormGroup;
  model: NgbDateStruct;


  constructor(private calendar: NgbCalendar) {
  }

  ngOnInit() {
    this.initializePersonalDataForm();
  }

  private ChangeSortOrder(newSortOrder: string) {
     this.selectedSortOrder = newSortOrder;
  }

  onSubmit() {
    console.log(this.personalDataForm.value);
  }

  private initializePersonalDataForm() {
    this.personalDataForm = new FormGroup({
      name: new FormControl(null),
      secondName: new FormControl(null),
      surname: new FormControl(null),
      dateOfBirth: new FormControl(),
      sex: new FormControl()
    });
  }
}
