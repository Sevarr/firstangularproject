import {Component, OnInit} from '@angular/core';
import {Form, FormControl, FormGroup} from '@angular/forms';
import {ModalDismissReasons, NgbCalendar, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';

interface PersonalData {
  id: number;
  name: string;
  forename: string;
  dateOfBirth: string;
}

const KIDPERSONALDATA: PersonalData[] = [];
const FAMILYMEMBERPERSONALDATA: PersonalData[] = [];
const KIDINSURANCEDATA: PersonalData[] = [];
const FAMILYMEMBERINSURANCEDATA: PersonalData[] = [];

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeDataForm: FormGroup;
  kidsDataForm: FormGroup;
  familyMembersDataForm: FormGroup;
  kidsInsuredDataForm: FormGroup;
  familyMembersInsuredDataForm: FormGroup;
  kidsPersonalDatas = KIDPERSONALDATA;
  familyMembersPersonalDatas = FAMILYMEMBERPERSONALDATA;
  kidsInsuranceDatas = KIDINSURANCEDATA;
  familyMembersInsuranceDatas = FAMILYMEMBERINSURANCEDATA;
  model: NgbDateStruct;
  closeResult = '';

  constructor(private modalService: NgbModal, private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
    this.initializeEmployeeDataForm();
    this.initializeKidsPersonalDataForm();
    this.initializeFamilyMembersDataForm();
    this.initializeKidsInsuredDataForm();
    this.initializefamilyMembersInsuredDataForm();
  }

  private initializeEmployeeDataForm() {
    this.employeeDataForm = new FormGroup({
      pesel: new FormControl(null),
      nip: new FormControl(null),
      city: new FormControl(null),
      postcode: new FormControl(null),
      community: new FormControl(null),
      county: new FormControl(null),
      street: new FormControl(null),
      houseNumber: new FormControl(null),
      apartmentNumber: new FormControl(null),
      taxOffice: new FormControl(null),
      citizenship: new FormControl(null),
      personToNotfiy: new FormControl(null),
      position: new FormControl(null),
      department: new FormControl(null),
      nfz: new FormControl(null),
      bankName: new FormControl(null),
      bankAccount: new FormControl(null)
    });
  }

  private initializeKidsPersonalDataForm() {
    this.kidsDataForm = new FormGroup(
      {
        id: new FormControl(null),
        name: new FormControl(null),
        forename: new FormControl(null),
        dateOfBirth: new FormControl(null),
      }
    );
  }

  private initializeFamilyMembersDataForm() {
    this.familyMembersDataForm = new FormGroup(
      {
        id: new FormControl(null),
        name: new FormControl(null),
        forename: new FormControl(null),
        dateOfBirth: new FormControl(null),
      }
    );
  }

  private initializeKidsInsuredDataForm() {
    this.kidsInsuredDataForm = new FormGroup(
      {
        id: new FormControl(null),
        name: new FormControl(null),
        forename: new FormControl(null),
        dateOfBirth: new FormControl(null),
      }
    );
  }

  private initializefamilyMembersInsuredDataForm() {
    this.familyMembersInsuredDataForm = new FormGroup(
      {
        id: new FormControl(null),
        name: new FormControl(null),
        forename: new FormControl(null),
        dateOfBirth: new FormControl(null),
      }
    );
  }

  onAdd(Content, modalTitle) {
    this.modalService.open(Content, {ariaLabelledBy: modalTitle}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // onDelete(id) {
  //   for (let i = 0; i < this.kidsPersonalDatas.length; ++i) {
  //     if (this.kidsPersonalDatas[i].id === id) {
  //       this.kidsPersonalDatas.splice(i, 1);
  //     }
  //   }
  // }

  onDelete(id, dataType) {
    for (let i = 0; i < dataType.length; ++i) {
      if (dataType[i].id === id) {
        dataType.splice(i, 1);
      }
    }
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

  private addKid() {
    this.kidsPersonalDatas.push(
      {
        id: this.kidsPersonalDatas.length + 1,
        name: this.kidsDataForm.value.name,
        forename: this.kidsDataForm.value.forename,
        dateOfBirth: this.kidsDataForm.value.dateOfBirth,
      }
    );
  }

  private addFamilyMember() {
    this.familyMembersPersonalDatas.push(
      {
        id: this.familyMembersPersonalDatas.length + 1,
        name: this.familyMembersDataForm.value.name,
        forename: this.familyMembersDataForm.value.forename,
        dateOfBirth: this.familyMembersDataForm.value.dateOfBirth,
      }
    );
  }

  private addKidToInsurance() {
    this.kidsInsuranceDatas.push(
      {
        id: this.kidsInsuranceDatas.length + 1,
        name: this.kidsInsuredDataForm.value.name,
        forename: this.kidsInsuredDataForm.value.forename,
        dateOfBirth: this.kidsInsuredDataForm.value.dateOfBirth,
      }
    );
  }

  private addFamilyMemberToInsurance() {
    this.familyMembersInsuranceDatas.push(
      {
        id: this.familyMembersInsuranceDatas.length + 1,
        name: this.familyMembersInsuredDataForm.value.name,
        forename: this.familyMembersInsuredDataForm.value.forename,
        dateOfBirth: this.familyMembersInsuredDataForm.value.dateOfBirth,
      }
    );
  }

  onSubmit() {
    console.log('Dane pracownika: ', this.employeeDataForm.value);
    console.log('Dane dzieci: ', this.kidsInsuredDataForm.value);
    console.log('Dane członków rodziny: ', this.familyMembersDataForm.value);
  }
}
