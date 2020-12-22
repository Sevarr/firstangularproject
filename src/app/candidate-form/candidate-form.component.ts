import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgbDateStruct, NgbCalendar, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

interface School {
  name: string;
  graduationYear: number;
  profession: string;
  specialty: string;
  title: string;
}

const SCHOOLS: School[] = [
  {
    name: 'Budowlana',
    graduationYear: 2020,
    profession: 'IT',
    specialty: 'Networking',
    title: 'BoS',
  },
];


@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})

export class CandidateFormComponent implements OnInit {

  sortOrders: string[] = ['Mężczyzna', 'Kobieta', 'Inne'];
  selectedSortOrder = 'Wybierz płeć';
  personalDataForm: FormGroup;
  contactDataForm: FormGroup;
  schoolDataForm: FormGroup;
  model: NgbDateStruct;
  schools = SCHOOLS;
  closeResult = '';

  constructor(
    private calendar: NgbCalendar,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit() {
    this.initializePersonalDataForm();
    this.initializeContactDataForm();
    this.initializeschoolDataForm();
  }

  changeSortOrder(newSortOrder: string) {
    this.selectedSortOrder = newSortOrder;
  }

  onSubmit() {
    console.log(this.personalDataForm.value);
    console.log(this.contactDataForm.value);
  }

  private initializePersonalDataForm() {
    this.personalDataForm = new FormGroup({
      name: new FormControl(null),
      secondName: new FormControl(null),
      surname: new FormControl(null),
      dateOfBirth: new FormControl(),
      sex: new FormControl(),
    });
  }

  private initializeContactDataForm() {
    this.contactDataForm = new FormGroup({
      phoneNumber: new FormControl(null),
      mailAddres: new FormControl(null),
    });
  }

  private initializeschoolDataForm() {
    this.schoolDataForm = new FormGroup({
      name: new FormControl( ' ', [Validators.required]),
      graduationYear: new FormControl(' ', [Validators.required]),
      profession: new FormControl(null),
      specialty: new FormControl(null),
      title: new FormControl(null),
    });
  }

  addSchool() {
    console.log(this.schoolDataForm.value.speciality);
    this.schools.push(
      {
        name: this.schoolDataForm.value.name,
        graduationYear: this.schoolDataForm.value.graduationYear,
        profession: this.schoolDataForm.value.profession,
        specialty: this.schoolDataForm.value.specialty,
        title: this.schoolDataForm.value.title
      });
  }

  onAdd(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // console.log(this.schoolDataForm.value.title);
      // this.newSchool(this.schoolDataForm.value.school, this.schoolDataForm.value.graduationYear, this.schoolDataForm.value.profession, this.schoolDataForm.value.speciality, this.schoolDataForm.value.title);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onDelete(selected: any) {

  }

  getSelected() {

  }
}


