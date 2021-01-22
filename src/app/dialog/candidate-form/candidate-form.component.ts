import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDataService } from '../../services/data/employee-data.service';

interface School {
  id: number;
  name: string;
  graduationYear: number;
  profession: string;
  specialty: string;
  title: string;
}

const SCHOOLS: School[] = [];

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
  dataComplete: boolean;
  model: NgbDateStruct;
  // date: {year: number, month: number, day: number};
  schools = SCHOOLS;
  closeResult = '';
  message = '';

  constructor(
    private calendar: NgbCalendar,
    private modalService: NgbModal,
    private employeeData: EmployeeDataService
  ) {
    this.getFromDatabase();
    this.dataComplete = true;
    // if (this.employeeData.getSex != null){
    //   this.selectedSortOrder = this.employeeData.getSex();
    // }
  }

  ngOnInit() {
    this.initializePersonalDataForm();
    this.initializeContactDataForm();
    this.initializeSchoolDataForm();

  }

  changeSortOrder(newSortOrder: string) {
      this.selectedSortOrder = newSortOrder;
    // switch (newSortOrder){
    //   case 'Mężczyzna' : {this.personalDataForm.value.sex = 'MALE'; break; }
    //   case 'Kobieta' : {this.personalDataForm.value.sex = 'FEMALE'; break; }
    //   default : {this.personalDataForm.value.sex = 'OTHER'; break; }
    // }
    // this.personalDataForm.value.sex = newSortOrder;
  }

  getFromDatabase(){
    this.employeeData.get();
  }

  private initializePersonalDataForm() {
      this.personalDataForm = new FormGroup({
        id: new FormControl(null),
        firstName: new FormControl(this.employeeData.getName(), [Validators.required]),
        secondName: new FormControl(this.employeeData.getSecondName()),
        surname: new FormControl(this.employeeData.getSurname(), [Validators.required]),
        dateOfBirth: new FormControl(this.employeeData.getBirthDate(), [Validators.required]),
        sex: new FormControl([Validators.required])
      });
  }

  private initializeContactDataForm() {
    this.contactDataForm = new FormGroup({
      phoneNumber: new FormControl(this.employeeData.getPhoneNumber(), [Validators.required]),
      // mailAddres: new FormControl(this.employeeData.getEmail(), [Validators.required]),
      fillLocation: new FormControl(this.employeeData.getFillLocation(), [Validators.required]),
      qualifications: new FormControl(this.employeeData.getQualifications()),
      prevEmployment: new FormControl(), // prevEmployment: new FormControl(this.employeeData.getPrevEmployment),
      additionalPersonalData: new FormControl(this.employeeData.getAdditionalPersonalData())
    });
  }

  private initializeSchoolDataForm() {
    this.schoolDataForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      graduationYear: new FormControl(null, [Validators.required]),
      profession: new FormControl(null),
      specialty: new FormControl(null),
      title: new FormControl(null),
    });
  }

  addSchool() {
    this.schools.push({
        id: (this.schools.length + 1),
        name: this.schoolDataForm.value.name,
        graduationYear: this.schoolDataForm.value.graduationYear,
        profession: this.schoolDataForm.value.profession,
        specialty: this.schoolDataForm.value.specialty,
        title: this.schoolDataForm.value.title
      });
  }

  onAdd(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // console.log(this.schoolDataForm.value.title);
      // this.newSchool(this.schoolDataForm.value.school, this.schoolDataForm.value.graduationYear, this.schoolDataForm.value.profession, this.schoolDataForm.value.speciality, this.schoolDataForm.value.title);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  poppingMessage(content, message){
    this.message = message;
    this.modalService.open(content, {ariaLabelledBy: 'poppingmassage'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
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

  onDelete(id) {
    for (let i = 0; i < this.schools.length; ++i) {
      if (this.schools[i].id === id) {
        this.schools.splice(i, 1);
      }
    }
  }

  validate(){
    if (this.personalDataForm.value.firstName == null ||
    this.personalDataForm.value.surname == null ||
    this.personalDataForm.value.dateOfBirth == null ||
    this.personalDataForm.value.sex == null){
      return false;
    }
    if (this.contactDataForm.value.phoneNumber == null ||
      // this.contactDataForm.value.mailAddres == null ||
      this.contactDataForm.value.fillLocation == null || this.contactDataForm.value.fillLocation === '""'){
       return false;
    }
    return true;
  }

  onSubmit() {
    this.dataComplete = this.validate();
    console.log('Formularz dane osobowe: ', this.personalDataForm.value);
    console.log('Formularz kontaktowy: ', this.contactDataForm.value);
    // console.log('Formularz szkoły: ', this.schoolDataForm.value);
    for (let i = 0; i < this.schools.length; i++){
      console.log('Szkoły ', i + 1, ':', this.schools[i]);
    }
    if (this.dataComplete){
      this.sendToDatabase();
      this.message = 'Dane zapisane poprawnie';
    } else {
      this.message = 'Nie udało się zapisać. Uzupełnij brakujące dane';
    }
  }

  sendToDatabase(){
    this.employeeData.setName(this.personalDataForm.value.firstName);
    this.employeeData.setSecondName(this.personalDataForm.value.secondName);
    this.employeeData.setSurname(this.personalDataForm.value.surname);
    this.employeeData.setBirthDate(this.personalDataForm.value.birthDate);
    console.log('Data urodzenia: ', this.personalDataForm.value.birthDate);
    this.employeeData.setSex(this.selectedSortOrder);
    this.employeeData.setPhoneNumber(this.contactDataForm.value.phoneNumber);
    // this.employeeData.setEmail(this.contactDataForm.value.email);
    this.employeeData.setFillLocation(this.contactDataForm.value.fillLocation);
    this.employeeData.setQualifications(this.contactDataForm.value.qualifications);
    // this.employeeData.prevEmployment(this.contactDataForm.value.prevEmployment);
    this.employeeData.setAdditionalPersonalData(this.contactDataForm.value.additionalPersonalData);
    this.employeeData.setSchools(this.schools);
    this.employeeData.setData('570b40dd-807b-4c3e-a834-e09f1d72480b');
    console.log('Data form: ', this.personalDataForm.value);
  }

}

