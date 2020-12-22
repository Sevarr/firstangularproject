import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  schoolDataForm: FormGroup;
  model: NgbDateStruct;
  schools = SCHOOLS;
  closeResult = '';

  constructor(private modalService: NgbModal,) {
  }

  ngOnInit(): void {
    this.initializeSchoolDataForm();
  }

  private initializeSchoolDataForm() {
    this.schoolDataForm = new FormGroup({
      name: new FormControl(null),
      graduationYear: new FormControl(null),
      profession: new FormControl(null),
      specialty: new FormControl(null),
      title: new FormControl(null),
    });
  }

  onAdd(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // console.log(this.schoolDataForm.value.title);
      // this.newSchool(this.schoolDataForm.value.school, this.schoolDataForm.value.graduationYear, this.schoolDataForm.value.profession, this.schoolDataForm.value.speciality, this.schoolDataForm.value.title);
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onDelete() {

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
