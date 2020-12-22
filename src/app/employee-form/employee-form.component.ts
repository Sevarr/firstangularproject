import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ModalDismissReasons, NgbCalendar, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';

interface PersonalData {
  id: number;
  name: string;
  forename: string;
  dateOfBirth: string;
}

const PERSONALDATA: PersonalData[] = [];
const FAMILYMEMBERPERSONALDATA: PersonalData[] = [];

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeDataForm: FormGroup;
  kidsDataForm: FormGroup;
  familyMembersDataForm: FormGroup;
  personalDatas = PERSONALDATA;
  familyMembersPersonalDatas = FAMILYMEMBERPERSONALDATA;
  model: NgbDateStruct;
  closeResult = '';

  constructor(private modalService: NgbModal, private calendar: NgbCalendar,) {
  }

  ngOnInit(): void {
    this.initializeEmployeeDataForm();
    this.initializePersonalDataForm();
    this.initializeFamilyMembersDataForm();
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

  private initializePersonalDataForm() {
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

  onAdd(content, modalTitle) {
    this.modalService.open(content, {ariaLabelledBy: modalTitle}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onDelete(id) {
    for (let i = 0; i < this.personalDatas.length; ++i) {
      if (this.personalDatas[i].id === id) {
        this.personalDatas.splice(i, 1);
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
    this.personalDatas.push(
      {
        id: this.personalDatas.length + 1,
        name: this.kidsDataForm.value.forename,
        forename: this.kidsDataForm.value.forename,
        dateOfBirth: this.kidsDataForm.value.dateOfBirth,
      }
    );
  }

  private addFamilyMember() {
    this.familyMembersPersonalDatas.push(
      {
        id: this.familyMembersPersonalDatas.length + 1,
        name: this.familyMembersDataForm.value.forename,
        forename: this.familyMembersDataForm.value.forename,
        dateOfBirth: this.familyMembersDataForm.value.dateOfBirth,
      }
    );
  }

  onSubmit() {
  }



}
