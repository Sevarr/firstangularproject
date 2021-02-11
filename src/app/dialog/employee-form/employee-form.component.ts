import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDataService } from '../../services/data/employee-data.service';

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
  dataComplete: boolean;
  message: string;

  constructor(
    private modalService: NgbModal,
    private calendar: NgbCalendar,
    private employeeData: EmployeeDataService
  ) {
    this.dataComplete = true;
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
      pesel: new FormControl(this.employeeData.getDocumentType_Number('pesel')),
      nip: new FormControl(this.employeeData.getDocumentType_Number('nip')),
      city: new FormControl(this.employeeData.getCity()),
      postcode: new FormControl(this.employeeData.getPostcode()),
      community: new FormControl(this.employeeData.getCommunity()),
      county: new FormControl(this.employeeData.getCounty()),
      street: new FormControl(this.employeeData.getStreet()),
      houseNumber: new FormControl(this.employeeData.getHouseNumber()),
      apartmentNumber: new FormControl(this.employeeData.getApartmentNumber()),
      taxOffice: new FormControl(this.employeeData.getTaxOffice()),
      citizenship: new FormControl(this.employeeData.getCitizenship()),
      personToNotfiy: new FormControl(this.employeeData.getPersonToNotify()),
      position: new FormControl(this.employeeData.getPosition()),
      department: new FormControl(this.employeeData.getDepartment()),
      nfz: new FormControl(this.employeeData.getNfz),
      bankName: new FormControl(this.employeeData.getBankName()),
      bankAccount: new FormControl(this.employeeData.getBankAccount())
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

  poppingMessage(content, message) {
    this.message = message;
    this.modalService.open(content, {ariaLabelledBy: 'poppingmassage'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit() {
    this.dataComplete = this.validate();
    if (this.dataComplete) {
      this.sendToDatabase();
      this.message = 'Dane zapisane poprawnie';
    } else {
      this.message = 'Nie udało się zapisać. Uzupełnij brakujące dane';
    }
  }

  private validate() {
    return true;
  }

  sendToDatabase() {
    this.employeeData.setDocumentType_Number(this.employeeDataForm.value.pesel, this.employeeDataForm.value.nip);
    this.employeeData.setCity(this.employeeDataForm.value.city);
    this.employeeData.setPostcode(this.employeeDataForm.value.postcode);
    this.employeeData.setCommunity(this.employeeDataForm.value.community);
    this.employeeData.setCounty(this.employeeDataForm.value.county);
    this.employeeData.setStreet(this.employeeDataForm.value.street);
    this.employeeData.setHouseNumber(this.employeeDataForm.value.houseNumber);
    this.employeeData.setApartmentNumber(this.employeeDataForm.value.apartmentNumber);
    this.employeeData.setTaxOffice(this.employeeDataForm.value.taxOffice);
    this.employeeData.setCitizenship(this.employeeDataForm.value.citizenship);
    this.employeeData.setPersonToNotify(this.employeeDataForm.value.personToNotfiy);
    this.employeeData.setPosition(this.employeeDataForm.value.position);
    this.employeeData.setDepartment(this.employeeDataForm.value.department);
    this.employeeData.setNfz(this.employeeDataForm.value.nfz);
    this.employeeData.setBankName(this.employeeDataForm.value.bankName);
    this.employeeData.setBankAccount(this.employeeDataForm.value.bankAccount);
    this.employeeData.setData();
  }
}
