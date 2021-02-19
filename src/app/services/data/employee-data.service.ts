import { ApiService } from '../api/api.service';
import { Injectable } from '@angular/core';

// const employee = {                          // Dane pracownika
//   email: null,                              // Adres mailowy
//   phoneNumber: null,                        // Numer telefonu
//   fillLocation: null,                       // Miejscowość wypełniania dokumentów
//   sex: null,                                // Płeć
//   firstName: null,                          // Imię
//   secondName: null,                         // Drugie imię
//   surname: null,                            // Nazwisko
//   prevEmployment: null,                     // Przebieg poprzedniego zatrudnienia
//   dateOfBirth: null,                        // Data urodzenia
//   qualifications: null,                     // Dodatkowe kwalifikacje
//   additionalPersonalData: null,             // Dodatkowe dane osobowe
//   citizenship: null,                        // Obywatelstwo
//   documentNumber: null,                     // Numer dokumentu (pesel lub nip)
//   documentType: null,                       // Typ dokumentu
//   taxOffice: null,                          // Urząd podatkowy
//   department: null,                         // Departament pracy
//   position: null,                           // Obejmowane stanowisko
//   employmentDate: null,                     // Data zatrudnienia
//   bank: null,                               // Nazwa banku
//   accountNumber: null,                      // Numer konta w banku
//   securityClearance: null,                  // Uprawnienia
//   disabledZUSNumber: null,                  // Numer ZUS niepełnosprawnego
//   disabledFrom: null,                       // Niepełnosprawny od
//   disabledTo: null,                         // Niepełnosprawny do
//   contractType: null,                       // Osoba do powiadomienia w razie wypadku
//   hasChildren: false,                       // Czy pracownik ma dzieci
//   // addresses: [],                            // Tabela adresów
//   // education: [],                            // Tabela ukończonych szkół
//   // familyMembers: [],                        // Tabela członków rodziny
//   nip: null,                                // Numer NIP
//   disabled: false,                          // Czy pracownik jest niepełnosprawny
//   nfz: null,                                // Numer ubezpieczenia NFZ
// // };
//
//     addresses: [{                     // Adresy użytkownika
//       addressType: null,              // Typ adresu
//       postalCode: null,               // Kod pocztowy
//       location: null,                 // Miejscowość
//       district: null,                 // Powiat
//       community: null,                // Gmina
//       street: null,                   // Ulica
//       homeNumber: null,               // Numer domu
//       flatNumber: null                // Numer mieszkania
//     }],
//
//     education: [{                     // Ukończone szkoły
//       schoolName: null,               // Nazwa ukończonej szkoły
//       graduationYear: null,           // Rok ukończenia szkoły
//       profession: null,               // Zawód
//       speciality: null,               // Specjalizacja
//       title: null                     // Tytuł
//    }],
//
//     familyMembers: [{                 // Członkowie rodziny
//       relationship: null,             // Relacje rodzinne z pracownikiem
//       name: null,                     // Imię
//       surname: null,                  // Nazwisko
//       birthDate: null,                // Data urodzenia
//       insuredAtEmployee: false,
//       legalGuardian: false,           // Czy pracownik jest prawnym opiekunem
//       disabledZUSNumber: null,        // Numer ZUS niepełnosprawnego
//       disabilityLevel: null,          // Poziom niepełnosprawności
//       onExclusiveMaintenance: true,
//       location: null,                 // Miejscowość zamieszkania
//       postCode: null,                 // Kod pocztowy
//       district: null,                 // Dzielnica
//       community: null,                // Gmina
//       street: null,                   // Ulica
//       homeNumber: null,               // Numer domu
//       flatNumber: null,               // Numer mieszkania
//       pesel: null,                    // Numer pesel
//       disabled: false,                // Czy jest niepełnosprawny
//       sharedHousehold: false
//     }]
//
// };



const employee = {
    email: null,
    phoneNumber: null,
    fillLocation: null,
    sex: null,
    firstName: null,
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

  constructor(private apiService: ApiService) {
      this.getUser();
      this.getData();
  }

  private jwtToken;
  private userType;
  private data;
  private employee = employee;

  getUser(): any {
    this.jwtToken = this.apiService.getUserToken();
    this.userType = this.apiService.getUserType();
  }

  clearEmployee(): any{
    this.employee = null;
  }

  getData(): any {
    this.getUser();
    this.employee = this.apiService.getEmployeeData(this.apiService.getUserToken(), this.apiService.getUserType()).subscribe((data) => {
      this.employee = data;
    });
  }

  setData(): any {
    this.apiService.sendEmployeeData(this.apiService.getUserToken(), this.employee)._subscribe(this.data);
    this.apiService.sendWorkerData(this.apiService.getUserToken(), this.employee)._subscribe(this.data);
  }

  getEmail(): string {
      return this.employee.email;
  }

  getPhoneNumber(): number {
    return this.employee.phoneNumber;
  }

  setPhoneNumber(phoneNumber): any {
    this.employee.phoneNumber = phoneNumber;
  }

  getFillLocation(): string {
    return this.employee.fillLocation;
  }

  setFillLocation(fillLocation): any {
    this.employee.fillLocation = fillLocation;
  }

  getSex(): string {
    switch (this.employee.sex){
      case 'MALE' : { return 'Mężczyzna'; }
      case 'FEMALE' : { return 'Kobieta'; }
      default : { return 'Inne'; }
    }
  }

  setSex(sex): any {
    switch (sex){
        case 'Mężczyzna' : {this.employee.sex = 'MALE'; break; }
        case 'Kobieta' : {this.employee.sex = 'FEMALE'; break; }
        default : {this.employee.sex = 'OTHER'; break; }
      }
  }

  getName(): string {
    return this.employee.firstName;
  }

  setName(name): any {
    this.employee.firstName = name;
  }

  getSecondName(): string {
    return this.employee.secondName;
  }

  setSecondName(secondName): any {
    this.employee.secondName = secondName;
  }

  getSurname(): string {
    return this.employee.surname;
  }

  setSurname(surename): any{
    this.employee.surname = surename;
  }

  getBirthDate(): string {
    let date;
    date = this.employee.dateOfBirth.split('-');
    if (date[1] < 10){ date[1] = (date[1][1]); }
    if (date[2] < 10){ date[2]  = (date[2][1]); }
    console.log(date);
    return date;
  }

  setBirthDate(birthDate): any {
    if (birthDate.day < 10){ birthDate.day = ('0' + birthDate.day); }
    if (birthDate.month < 10){ birthDate.month = ('0' + birthDate.month); }
    const date = (birthDate.year + '-' + birthDate.month + '-' + birthDate.day);
    this.employee.dateOfBirth  = date;
  }

  getQualifications(): string {
    return this.employee.qualifications;
  }

  setQualifications(qualifications): any {
    this.employee.qualifications = qualifications;
  }

  getPrevEmployment(): string {
    return this.employee.prevEmployment;
  }

  setPrevEmployment(prevEmployment): any {
    this.employee.prevEmployment = prevEmployment;
  }

  getAdditionalPersonalData(): string {
    return this.employee.additionalPersonalData;
  }

  setAdditionalPersonalData(additionalPersonalData): any {
    this.employee.additionalPersonalData = additionalPersonalData;
  }

  getEducation(): any[] {
    return this.employee.education;
  }

  setEducation(schools): any{
    for (let i = 0; i < this.employee.education.length; i++) {
      this.employee.education.splice(i);
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < schools.length; i++) {
      this.employee.education.push(schools[i]);
    }
  }

  getCitizenship(): string {
    return this.employee.citizenship;
  }

  setCitizenship(citizenship): any{
    this.employee.citizenship = citizenship;
  }

  // Pesel or NIP
  getDocumentType_Number(documentType): string{
    if (documentType === 'pesel' && this.employee.documentType === 'pesel') {
      return (this.employee.documentNumber);
    } else if (documentType === 'nip' && this.employee.documentType === 'nip') {
      return (this.employee.documentNumber);
    }
  }

  setDocumentType_Number(pesel, nip): any {
    if (pesel !== null) {
      this.employee.documentType = 'pesel';
      this.employee.documentNumber = pesel;
    } else {
      this.employee.documentType = 'nip';
      this.employee.documentNumber = nip;
    }
  }

  // getCity(): string{
  //
  // }
  //
  // setCity(city){
  //
  // }
  //
  // getPostcode(){
  //
  // }
  //
  // setPostcode(postcode){
  //
  // }
  //
  // getCommunity(){
  //
  // }
  //
  // setCommunity(community){
  //
  // }
  //
  // getCounty(){
  //
  // }
  //
  // setCounty(county){
  //
  // }
  //
  // getStreet(){
  //
  // }
  //
  // setStreet(street){
  //
  // }
  //
  // getHouseNumber(){
  //
  // }
  //
  // setHouseNumber(houseNumber){
  //
  // }
  //
  // getApartmentNumber(){
  //
  // }
  //
  // setApartmentNumber(apartmentNumber){
  //   // this.employee.
  // }


  getTaxOffice(): string {
    return this.employee.taxOffice;
  }

  setTaxOffice(taxOffice): any {
    this.employee.taxOffice = taxOffice;
  }

  getPersonToNotify(): string {
    return this.employee.contractType;
  }

  setPersonToNotify(personToNotify): any {
    this.employee.contractType = personToNotify;
  }

  getPosition(): string {
    return this.employee.workplace;
  }

  setPosition(position): any{
    this.employee.workplace = position;
  }

  getDepartment(): string {
    return this.employee.department;
  }

  setDepartment(department): any{
    this.employee.department = department;
  }

  getNfz(): string {
    return this.employee.nfz;
  }

  setNfz(nfz): any {
    this.employee.nfz = nfz;
  }

  getBankName(): string {
    return this.employee.bank;
  }

  setBankName(bankName): any {
    this.employee.bank = bankName;
  }

  getBankAccount(): string {
    return this.employee.accountNumber;
  }

  setBankAccount(bankAccount): any {
    this.employee.accountNumber = bankAccount;
  }

  // getCandidate(): object {
  //   return this.employee;
  // }
}
