import { Component, OnInit } from '@angular/core';
import { RestService} from '../services/rest/rest.service';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDataService } from '../services/data/employee-data.service';

// interface School {
//   name: string;
//   graduationYear: number;
//   profession: string;
//   specialty: string;
//   title: string;
// }
//
// const SCHOOLS: School[] = [
//   {
//     name: 'Budowlana',
//     graduationYear: 2020,
//     profession: 'IT',
//     specialty: 'Networking',
//     title: 'BoS',
//   },
// ];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  // employeeData: EmployeeDataService;
  constructor(private apiService: RestService, private employeeData: EmployeeDataService) { }

  // employees;

  ngOnInit() {
    this.employeeData.getData('570b40dd-807b-4c3e-a834-e09f1d72480b');
    // this.apiService.getTest().subscribe((data) => {
    //   this.employees = data;
    //   console.log(this.employees);
    // });
  }

  dodaj(){
    // this.employeeData.getData('570b40dd-807b-4c3e-a834-e09f1d72480b');
    console.log(this.employeeData.getEmail());
    console.log(this.employeeData.getPhoneNumber());
    console.log(this.employeeData.getFillLocation());
    console.log(this.employeeData.getName());
    console.log(this.employeeData.getEducation());
    // this.employees.email = 'dziala@test' ;
    // this.apiService.sendTest(this.employees)._subscribe(this.employees);
    // console.log('dodanochyba');
  }



  // schoolDataForm: FormGroup;
  // model: NgbDateStruct;
  // schools = SCHOOLS;
  // closeResult = '';

  // constructor(private modalService: NgbModal) {
  // }

  // ngOnInit(): void {
  //   this.initializeSchoolDataForm();
  // }

  // private initializeSchoolDataForm() {
  //   this.schoolDataForm = new FormGroup({
  //     name: new FormControl(null),
  //     graduationYear: new FormControl(null),
  //     profession: new FormControl(null),
  //     specialty: new FormControl(null),
  //     title: new FormControl(null),
  //   });
  // }

  // onAdd(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //     // console.log(this.schoolDataForm.value.title);
  //     // this.newSchool(this.schoolDataForm.value.school, this.schoolDataForm.value.graduationYear, this.schoolDataForm.value.profession, this.schoolDataForm.value.speciality, this.schoolDataForm.value.title);
  //   }, (reason) => {
  //     // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  //
  // onDelete() {
  //
  // }
  //
  // addSchool() {
  //   console.log(this.schoolDataForm.value.speciality);
  //   this.schools.push(
  //     {
  //       name: this.schoolDataForm.value.name,
  //       graduationYear: this.schoolDataForm.value.graduationYear,
  //       profession: this.schoolDataForm.value.profession,
  //       specialty: this.schoolDataForm.value.specialty,
  //       title: this.schoolDataForm.value.title
  //     });
  // }

  // addSchool(){
  //   console.log(this.schoolDataForm.value.title);
  //     this.schools.push(
  //       this.schoolDataForm.value.name,
  //    //   this.schoolDataForm.value.graduationYear,
  //    //   this.schoolDataForm.value.profession,
  //    //   this.schoolDataForm.value.specialty,
  //    //   this.schoolDataForm.value.title
  //     );
  // }

  // addSchool(name, graduationYear, profession, specialty, title){
  //   this.schools.push(name, graduationYear, profession, specialty, title);
  // };

}
