import { RestService } from '../rest/rest.service';
import { Injectable } from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private apiService: RestService, private authService: AuthService) {
    this.getData(this.authService.getJwtToken(), this.authService.getUserType());
  }

  private employee;

  get(){console.log('nic'); }

  getData(token, userType) {
    this.apiService.getEmployeeData(token, userType).subscribe((data) => {
      this.employee = data;
      console.log(this.employee);
    });
  }

  setData(id) {
    this.apiService.sendEmployeeData(id, this.employee)._subscribe(this.employee);
  }

  getEmail() {
    return this.employee.email;
  }

  setEmail(email) {
    // console.log(this.employee.email);
    this.employee.email = email;
  }

  getPhoneNumber() {
    return this.employee.phoneNumber;
  }

  setPhoneNumber(phoneNumber) {
    this.employee.phoneNumber = phoneNumber;
  }

  getFillLocation(){
    return this.employee.fillLocation;
  }

  setFillLocation(fillLocation){
    this.employee.fillLocation = fillLocation;
  }

  getSex(){
    switch (this.employee.sex){
      case 'MALE' : {return 'Mężczyzna'; break; }
      case 'FEMALE' : {return 'Kobieta'; break; }
      default : {return 'Inne'; break; }
    }
  }

  setSex(sex) {
    switch (sex){
        case 'Mężczyzna' : {this.employee.sex = 'MALE'; break; }
        case 'Kobieta' : {this.employee.sex = 'FEMALE'; break; }
        default : {this.employee.sex = 'OTHER'; break; }
      }
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

  setSecondName(secondName) {
    this.employee.secondName = secondName;
  }

  getSurname(){
    return this.employee.surname;
  }

  setSurname(surename){
    this.employee.surname = surename;
  }

  getBirthDate(){
    return this.employee.birthDate;
  }

  setBirthDate(birthDate){
    this.employee.birthDate = birthDate;
  }

  // getProfession(){
  //   return this.employee.profession;
  // }
  //
  // setProfession(profession){
  //   this.employee.profession = profession;
  // }
  //
  // getSpecialty(){
  //   return this.employee.specialty;
  // }
  //
  // getTitle(){
  //   return this.employee.title;
  // }
  //
  // setTitle(title){
  //   this.employee.title = title;
  // }

  getQualifications(){
    return this.employee.qualifications;
  }

  setQualifications(qualifications){
    this.employee.qualifications = qualifications;
  }

  getAdditionalPersonalData(){
    return this.employee.optionalData;
  }

  setAdditionalPersonalData(personalData){
    this.employee.optionalData = personalData;
  }

  getSchools(){
    return this.employee.education;
  }

  setSchools(schools){
    for (let i = 0; i < this.employee.education.length; i++) {
      this.employee.education.splice(i);
    }
    for (let i = 0; i < schools.length; i++) {
      this.employee.education.push(schools[i]);
    }
    console.log('Szkoły w setSchools: ', schools);
    console.log('Education z db w setSchools: ', this.employee.education);

    // for (let i = 0; i < schools.length; i++) {
    //   this.employee.education.push({
    //     name: (schools[i].name),
    //     graduationYear: (schools[i].graduationYear)
    //   });
    //   // console.log(schools);
    // }
  }

  getCitizenship(){
    return this.employee.citizenship;
  }

  setCitizenship(citizenship){
    this.employee.citizenship = citizenship;
  }

  // Pesel or NIP
  getDocumentType_Number(){
    return this.employee.documentType;
    return this.employee.documentNumber;
  }

  setDocumentType_Number(documentType, documentNumber){
    this.employee.documentType = documentType;
    this.employee.documentNumber = documentNumber;
  }

  getTaxOffice(){
    return this.employee.taxOffice;
  }

  setTaxOffice(taxOffice){
    this.employee.taxOffice = taxOffice;
  }

  // Need that combined
  // "authorizedName": null,
  // "authorizedSurname": null,
  // "authorizedContact": null,
  getPersonToNotify(){
    return this.employee.authorizedName;
  }

  setPersonToNotify(personToNotify){
    this.employee.authorizedName = personToNotify;
  }

  getWorkplace(){
    return this.employee.workplace;
  }

  setWorkplace(workplace){
    this.employee.workplace = workplace;
  }

  getDepartment(){
    return this.employee.department;
  }

  setDepartment(department){
    this.employee.department = department;
  }

  getEmploymentDate(){
    return this.employee.employmentDate;
  }

  setEmplotymentDate(employmentDate){
    this.employee.employmentDate = employmentDate;
  }

  getBankName(){
    return this.employee.bank;
  }

  setBankName(bankName){
    this.employee.bankName = bankName;
  }

  getBankAccount(){
    return this.employee.accountNumber;
  }

  setBankAccount(bankAccount){
    this.employee.bankAccount = bankAccount;
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
