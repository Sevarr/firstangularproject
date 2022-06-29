import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ModalDismissReasons, NgbCalendar, NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeDataService} from '../../services/data/employee-data.service';

interface AddressesData {
  id: number;
  addressType: string;
  location: string;
  postalCode: string;
  community: string;
  district: string;
  street: string;
  homeNumber: string;
  flatNumber: string;
}

interface FamilyMemberData {
  id: number;
  relationship: string;
  name: string;
  surname: string;
  birthDate: string;
  insuredAtEmployee: false;
}

const ADDRESSESDATA: AddressesData[] = [];
const FAMILYMEMBERPERSONALDATA: FamilyMemberData[] = [];

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeDataForm: FormGroup;
  addressesDataForm: FormGroup;
  familyMembersDataForm: FormGroup;
  addressesDatas = ADDRESSESDATA;
  familyMembersPersonalDatas = FAMILYMEMBERPERSONALDATA;
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
    this.initializeAddressesDataForm();
    this.initializeFamilyMembersDataForm();
  }

  private initializeEmployeeDataForm(): any {
    this.employeeDataForm = new FormGroup({
      pesel: new FormControl(this.employeeData.getDocumentType_Number('pesel')),
      nip: new FormControl(this.employeeData.getDocumentType_Number('nip')),
      taxOffice: new FormControl(this.employeeData.getTaxOffice()),
      citizenship: new FormControl(this.employeeData.getCitizenship()),
      position: new FormControl(this.employeeData.getPosition()),
      department: new FormControl(this.employeeData.getDepartment()),
      nfz: new FormControl(this.employeeData.getNfz()),
      bankName: new FormControl(this.employeeData.getBankName()),
      bankAccount: new FormControl(this.employeeData.getBankAccount()),
      personToNotfiy: new FormControl(this.employeeData.getPersonToNotify())
    });
  }

  private initializeAddressesDataForm(): any {
    this.addressesDataForm = new FormGroup(
      {
        addressType: new FormControl(null),
        location: new FormControl(null),
        postalCode: new FormControl(null),
        community: new FormControl(null),
        district: new FormControl(null),
        street: new FormControl(null),
        homeNumber: new FormControl(null),
        flatNumber: new FormControl(null),
      });
    this.getAddresses();
  }

  private initializeFamilyMembersDataForm(): any {
    this.familyMembersDataForm = new FormGroup(
      {
        id: new FormControl(null),
        relationship: new FormControl(null),
        name: new FormControl(null),
        surname: new FormControl(null),
        birthDate: new FormControl(null),
        insuredAtEmployee: new FormControl(null),
        legalGuardian: new FormControl(false),
      });
    this.getFamilyMembersData();
  }

  onAdd(Content, modalTitle): any {
    this.modalService.open(Content, {ariaLabelledBy: modalTitle}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onDelete(id, dataType): any {
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

  private addAddressData(): any {
    this.addressesDatas.push(
      {
        id: this.addressesDatas.length + 1,
        addressType: this.addressesDataForm.value.addressType,
        location: this.addressesDataForm.value.location,
        postalCode: this.addressesDataForm.value.postalCode,
        community: this.addressesDataForm.value.community,
        district: this.addressesDataForm.value.district,
        street: this.addressesDataForm.value.street,
        homeNumber: this.addressesDataForm.value.homeNumber,
        flatNumber: this.addressesDataForm.value.flatNumber,
      }
    );
  }

  private addFamilyMember(): any {
    this.familyMembersPersonalDatas.push(
      {
        id: this.familyMembersPersonalDatas.length + 1,
        relationship: this.familyMembersDataForm.value.relationship,
        name: this.familyMembersDataForm.value.name,
        surname: this.familyMembersDataForm.value.surname,
        birthDate: (this.familyMembersDataForm.value.birthDate.year + '-' + this.familyMembersDataForm.value.birthDate.month + '-' + this.familyMembersDataForm.value.birthDate.day),
        insuredAtEmployee: this.familyMembersDataForm.value.insuredAtEmployee,
      }
    );
  }

  private getAddresses() {
    this.addressesDatas = this.employeeData.getAddresses();
  }

  private getFamilyMembersData() {
    this.familyMembersPersonalDatas = this.employeeData.getFamilyMembers();
  }

  poppingMessage(content, message): any {
    this.message = message;
    this.modalService.open(content, {ariaLabelledBy: 'poppingmassage'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onSubmit(): any {
    this.dataComplete = this.validate();
    if (this.dataComplete) {
      this.sendToDatabase();
      this.message = 'Dane zapisane poprawnie';
    } else {
      this.message = 'Nie udało się zapisać. Uzupełnij brakujące dane';
    }
  }

  private validate(): boolean {
    return true;
  }

  sendToDatabase(): any {
    this.employeeData.setDocumentType_Number(this.employeeDataForm.value.pesel, this.employeeDataForm.value.nip);
    this.employeeData.setTaxOffice(this.employeeDataForm.value.taxOffice);
    this.employeeData.setCitizenship(this.employeeDataForm.value.citizenship);
    this.employeeData.setPersonToNotify(this.employeeDataForm.value.personToNotfiy);
    this.employeeData.setPosition(this.employeeDataForm.value.position);
    this.employeeData.setDepartment(this.employeeDataForm.value.department);
    this.employeeData.setNfz(this.employeeDataForm.value.nfz);
    this.employeeData.setBankName(this.employeeDataForm.value.bankName);
    this.employeeData.setBankAccount(this.employeeDataForm.value.bankAccount);
    this.employeeData.setAddresses(this.addressesDatas);
    this.employeeData.setFamilyMembers(this.familyMembersPersonalDatas);
    this.employeeData.setData();
  }


}
