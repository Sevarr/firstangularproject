import { ApiService } from '../api/api.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../api/auth.service';

let employee = {
    email: null,
    phoneNumber: null,
    fillLocation: null,
    sex: null,
    firstName: null, // null,
    secondName: null,
    surname: null,
    prevEmployment: null,
    dateOfBirth: null,
    qualifications: null,
    additionalPersonalData: null,
    citizenship: null,
    documentNumber: null,
    documentType: null,
    taxOffice: null,
    willSpecialPowersForFamily: false,
    willPIT2: false,
    workplace: null,
    department: null,
    pension: null,
    employmentDate: null,
    bank: null,
    accountNumber: null,
    securityClearance: null,
    pensionZUSNumber: null,
    disabledZUSNumber: null,
    disabledFrom: null,
    disabledTo: null,
    medicover: null,
    contractType: null,
    incomePerPerson: null,
    hasChildren: false,
    willParent: false,
    childUnderFourPermissions: null,
    childUnderFourteenPermissions: null,
    willReducedTask: false,
    methodOfTaxation: false,
    annualEarningsFamily: null,
    willTaxReducingAmount: false,
    willHigherTask: false,
    higherTaskMonth: null,
    willIncreasedCosts: false,
    willZUS: false,
    annualEarningsZUS: null,
    addresses: [],
    education: [],
    familyMembers: [],
    nip: null,
    disabled: false,
    nfz: null,
    zfss1: false,
    zfss4: false,
    zfss3: false,
    zfss7: false,
    zfss2: false,
    zfss5: false,
    zfss6: false
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private apiService: ApiService, private authService: AuthService) {
      this.getUser();
      this.getData();
  }

  private jwtToken;
  private userType;
  private data;
  private employee = employee;
  // private dataCompleted = false;

  getUser(){
    this.jwtToken = this.authService.getJwtToken();
    this.userType = this.authService.getUserType();
  }

  clearEmployee(){
    this.employee = null;
  }

  get(){console.log('Tworzenie employee-data'); }

  // getDataCompleted(){
  //   return this.dataCompleted;
  // }

  getData() {
    this.getUser();
    this.apiService.getEmployeeData(this.authService.getJwtToken(), this.authService.getUserType()).subscribe((data) => {
      this.employee = data;
      // console.log(this.employee);
    });
    // if (this.data.name !== '') {
    //   this.dataCompleted = true;
    // }
    // this.employee = this.data;
  }

  setData() {
    // this.data = this.employee;
    this.apiService.sendEmployeeData(this.authService.getJwtToken(), this.employee)._subscribe(this.data);
    this.apiService.sendWorkerData(this.authService.getJwtToken(), this.employee)._subscribe(this.data);
  }

  getEmail() {
      return this.employee.email;
  }

  // setEmail(email) {
  //   // console.log(this.employee.email);
  //   this.employee.email = email;
  // }

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
    console.log('Uzystane dane: ', this.employee);
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
    let date;
    date = this.employee.dateOfBirth.split('-');
    if (date[1] < 10){ date[1] = (date[1][1]); }
    if (date[2] < 10){ date[2]  = (date[2][1]); }
    console.log(date);
    return date;
  }

  setBirthDate(birthDate){
    if (birthDate.day < 10){ birthDate.day = ('0' + birthDate.day); }
    if (birthDate.month < 10){ birthDate.month = ('0' + birthDate.month); }
    const date = (birthDate.year + '-' + birthDate.month + '-' + birthDate.day);
    this.employee.dateOfBirth  = date;
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

  getPrevEmployment(){
    return this.employee.prevEmployment;
  }

  setPrevEmployment(prevEmployment){
    this.employee.prevEmployment = prevEmployment;
  }

  getAdditionalPersonalData(){
    return this.employee.additionalPersonalData;
  }

  setAdditionalPersonalData(additionalPersonalData){
    this.employee.additionalPersonalData = additionalPersonalData;
  }

  getEducation(){
    return this.employee.education;
  }

  setEducation(schools){
    for (let i = 0; i < this.employee.education.length; i++) {
      this.employee.education.splice(i);
    }
    for (let i = 0; i < schools.length; i++) {
      this.employee.education.push(schools[i]);
    }

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
  getDocumentType_Number(documentType){
    if (documentType === 'pesel' && this.employee.documentType === 'pesel') {
      return (this.employee.documentNumber);
    } else if (documentType === 'nip' && this.employee.documentType === 'nip') {
      return (this.employee.documentNumber);
    }
  }

  setDocumentType_Number(pesel, nip){
    if (pesel !== null) {
      this.employee.documentType = 'pesel';
      this.employee.documentNumber = pesel;
    } else {
      this.employee.documentType = 'nip';
      this.employee.documentNumber = nip;
    }
  }

  getCity(){

  }

  setCity(city){

  }

  getPostcode(){

  }

  setPostcode(postcode){

  }

  getCommunity(){

  }

  setCommunity(community){

  }

  getCounty(){

  }

  setCounty(county){

  }

  getStreet(){

  }

  setStreet(street){

  }

  getHouseNumber(){

  }

  setHouseNumber(houseNumber){

  }

  getApartmentNumber(){

  }

  setApartmentNumber(apartmentNumber){
    // this.employee.
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
    return this.employee.contractType;
  }

  setPersonToNotify(personToNotify){
    this.employee.contractType = personToNotify;
  }

  getPosition(){
    return this.employee.workplace;
  }

  setPosition(position){
    this.employee.workplace = position;
  }

  getDepartment(){
    return this.employee.department;
  }

  setDepartment(department){
    this.employee.department = department;
  }

  getNfz(){
    return this.employee.nfz;
  }

  setNfz(nfz){
    this.employee.nfz = nfz;
  }

  getBankName(){
    return this.employee.bank;
  }

  setBankName(bankName){
    this.employee.bank = bankName;
  }

  getBankAccount(){
    return this.employee.accountNumber;
  }

  setBankAccount(bankAccount){
    this.employee.accountNumber = bankAccount;
  }

  getCandidate() {
    return this.employee;
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
