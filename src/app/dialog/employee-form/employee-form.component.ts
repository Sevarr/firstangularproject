import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDataService } from '../../services/data/employee-data.service';

interface AddressesData {
  id: number;
  addressType: string;
  city: string;
  postcode: string;
  community: string;
  county: string;
  street: string;
  houseNumber: string;
  apartmentNumber: string;
}

interface PersonalData {
  id: number;
  connection: string;
  name: string;
  forename: string;
  dateOfBirth: string;
  insured: boolean;
}

const ADDRESSESDATA: AddressesData[] = [];
const FAMILYMEMBERPERSONALDATA: PersonalData[] = [];

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
      personToNotfiy: new FormControl(this.employeeData.getPersonToNotify()),
      position: new FormControl(this.employeeData.getPosition()),
      department: new FormControl(this.employeeData.getDepartment()),
      nfz: new FormControl(this.employeeData.getNfz()),
      bankName: new FormControl(this.employeeData.getBankName()),
      bankAccount: new FormControl(this.employeeData.getBankAccount())
    });
  }

  private initializeAddressesDataForm(): any {
    this.addressesDataForm = new FormGroup(
      {
        addressType: new FormControl(null),
        city: new FormControl(null),
        postcode: new FormControl(null),
        community: new FormControl(null),
        county: new FormControl(null),
        street: new FormControl(null),
        houseNumber: new FormControl(null),
        apartmentNumber: new FormControl(null),
      }
    );
  }

  private initializeFamilyMembersDataForm(): any {
    this.familyMembersDataForm = new FormGroup(
      {
        id: new FormControl(null),
        connection: new FormControl(null),
        name: new FormControl(null),
        forename: new FormControl(null),
        dateOfBirth: new FormControl(null),
        insured: new FormControl(null)
      }
    );
  }

  onAdd(Content, modalTitle): any {
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
        city: this.addressesDataForm.value.city,
        postcode: this.addressesDataForm.value.postcode,
        community: this.addressesDataForm.value.community,
        county: this.addressesDataForm.value.county,
        street: this.addressesDataForm.value.street,
        houseNumber: this.addressesDataForm.value.houseNumber,
        apartmentNumber: this.addressesDataForm.value.apartmentNumber,
      }
    );
  }

  private addFamilyMember(): any {
    this.familyMembersPersonalDatas.push(
      {
        id: this.familyMembersPersonalDatas.length + 1,
        connection: this.familyMembersDataForm.value.connection,
        name: this.familyMembersDataForm.value.name,
        forename: this.familyMembersDataForm.value.forename,
        dateOfBirth: (this.familyMembersDataForm.value.dateOfBirth.year + '-' + this.familyMembersDataForm.value.dateOfBirth.month + '-' + this.familyMembersDataForm.value.dateOfBirth.day),
        insured: this.familyMembersDataForm.value.insured,
      }
    );
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
    // this.employeeData.setCity(this.employeeDataForm.value.city);
    // this.employeeData.setPostcode(this.employeeDataForm.value.postcode);
    // this.employeeData.setCommunity(this.employeeDataForm.value.community);
    // this.employeeData.setCounty(this.employeeDataForm.value.county);
    // this.employeeData.setStreet(this.employeeDataForm.value.street);
    // this.employeeData.setHouseNumber(this.employeeDataForm.value.houseNumber);
    // this.employeeData.setApartmentNumber(this.employeeDataForm.value.apartmentNumber);
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
