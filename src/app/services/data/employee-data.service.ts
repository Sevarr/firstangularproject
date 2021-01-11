import { RestService } from '../rest/rest.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private apiService: RestService) {
    this.getData('570b40dd-807b-4c3e-a834-e09f1d72480b');
  }

  employee;

  // dodaj(){
  //   this.employees.email = 'dziala@test' ;
  //   this.apiService.sendTest(this.employees)._subscribe(this.employees);
  //   console.log('dodanochyba');
  // }

  getData(id) {
    this.apiService.getEmployeeData(id).subscribe((data) => {
      this.employee = data;
    });
  }

  setData(id) {
    this.apiService.sendEmployeeData(id, this.employee)._subscribe(this.employee);
  }

  // getData() {
  //   this.apiService.getEmployeeData().subscribe((data) => {
  //     this.employee = data;
  //   });
  // }

  getEmail() {
    return this.employee.email;
  }

  setEmail(email) {
    this.employee.email = email;
  }

  getPhoneNumber() {
    return this.employee.phoneNumber;
  }

  getFillLocation(){
    return this.employee.fillLocation;
  }

  getSex(){
    return this.employee.sex;
  }

  getName() {
    return this.employee.firstName;
  }

  setName(name) {
    this.employee.firstName = name;
  }

  getSecondName() {
    return this.employee.secondName;
  }

  getSurname(){
    return this.employee.surname;
  }

  getBirthDate(){
    return this.employee.birthDate;
  }

  getProfession(){
    return this.employee.profession;
  }

  getSpecialty(){
    return this.employee.specialty;
  }

  getTitle(){
    return this.employee.title;
  }

  getQualification(){
    return this.employee.qualifications;
  }

  getAdditionalPersonalData(){
    return this.employee.optionalData;
  }

  getEducation(){
    return this.employee.education;
  }

  getCitizenship(){
    return this.employee.citizenship;
  }

  // Pesel or NIP
  getDocumentType_Number(){
    return this.employee.documentType;
    return this.employee.documentNumber;
  }

  getTaxOffice(){
    return this.employee.taxOffice;
  }

  // Need that combined
  // "authorizedName": null,
  // "authorizedSurname": null,
  // "authorizedContact": null,
  getPersonToNotify(){
    return this.employee.authorizedName;
  }

  getWorkplace(){
    return this.employee.workplace;
  }

  getDepartment(){
    return this.employee.department;
  }

  getEmploymentDate(){
    return this.employee.employmentDate;
  }

  getBankName(){
    return this.employee.bank;
  }

  getBankAccount(){
    return this.employee.accountNumber;
  }
}



//   "willSpecialPowersForFamily": false,
//   "willPIT2": false,
//   "pension": null,
//   "securityClearance": null,
//   "pensionZUSNumber": null,
//   "disabledZUSNumber": null,
//   "disabledFrom": null,
//   "disabledTo": null,
//   "medicover": null,
//   "contractType": null,
//   "incomePerPerson": null,
//   "hasChildren": false,
//   "willParent": false,
//   "childUnderFourPermissions": null,
//   "childUnderFourteenPermissions": null,
//   "willReducedTask": false,
//   "methodOfTaxation": false,
//   "annualEarningsFamily": null,
//   "willTaxReducingAmount": false,
//   "willHigherTask": false,
//   "higherTaskMonth": null,
//   "willIncreasedCosts": false,
//   "willZUS": false,
//   "annualEarningsZUS": null,
//   "addresses": [
//   {
//     "id": "1fb08251-1a99-4b21-b256-6ce789109d53",
//     "addressType": "ALL",
//     "postalCode": "42-605",
//     "location": "gLIWICE",
//     "district": null,
//     "community": null,
//     "street": "Jasna",
//     "homeNumber": "12",
//     "flatNumber": null
//   }
// ],
//   "education": [
//   {
//     "id": "6f8b78a2-50db-44ba-8cd4-91c09ac7c4aa",
//     "schoolName": "",
//     "graduationYear": "2020"
//   },
//   {
//     "id": "b3bf839a-ad86-4a31-8798-4cfd5a3e4c2a",
//     "schoolName": "POLSL",
//     "graduationYear": "2020"
//   }
// ],
//   "employments": [
//   {
//     "id": "d220806b-46bc-4b29-8002-732c3766790a",
//     "start": "2015-02",
//     "finish": "2017-05",
//     "name": "Wasko",
//     "workplace": "Programista Java"
//   }
// ],
//   "familyMembers": [
//   {
//     "id": "14d7e4ae-42d8-406b-a692-b545917480c2",
//     "relationship": "CHILD",
//     "name": "Adam",
//     "surname": "Nowak",
//     "birthDate": "2010-10-10",
//     "insuredAtEmployee": true,
//     "legalGuardian": true,
//     "disabledZUSNumber": null,
//     "disabilityLevel": null,
//     "onExclusiveMaintenance": false,
//     "location": "Katowice",
//     "postCode": "12-345",
//     "district": null,
//     "community": null,
//     "street": "Majewskiego",
//     "homeNumber": "44",
//     "flatNumber": null,
//     "pesel": "94021982948",
//     "disabled": false,
//     "sharedHousehold": true
//   }
// ],
//   "nip": null,
//   "polishCitizen": false,
//   "zfss4": false,
//   "disabled": false,
//   "nfz": null,
//   "zfss1": false,
//   "zfss2": false,
//   "zfss6": false,
//   "zfss5": false,
//   "zfss3": false,
//   "zfss7": false
