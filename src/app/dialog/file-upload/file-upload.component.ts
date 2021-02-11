import { Component, OnInit } from '@angular/core';
import { DocumentGeneratorService } from '../../services/documents/document-generator.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  fileForm: FormGroup;
  dataToAddForm: FormGroup;
  private fileName;
  closeResult = '';
  list = ['Data', 'Imie', 'Drugie_imie', 'Nazwisko', 'Data_urodzenia', 'Plec', 'Numer_telefonu', 'Miejscowosc_wypelniania_formularza', 'Kwalifikacje_zawodowe', 'Przebieg_dotychczasowego_zatrudnienia', 'Dodatkowe_dane_osobowe', 'Ukonczone_szkoly'];
  sortOrders: string[] = this.list;
  defaultSelectedSortOrder = 'Wybierz informację, którą chcesz dodać do pliku';
  selectedSortOrder = this.defaultSelectedSortOrder;
  private message: string;

  constructor(private documentGenerator: DocumentGeneratorService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.initializeDataToAdd();
    this.fileForm = new FormGroup({
      file: new FormControl(null)
    });
    const date = new Date();
    console.log('data to: ', (String(date.getDate().toString().padStart(2, '0')) + ' ' + String(date.getMonth() + 1).padStart(2, '0')) + ' ' + String(date.getFullYear()));
  }

  // selectedName() {
  //   switch (this.selectedSortOrder) {
  //     case 'Data' : {this.dataToAddForm.value.name = 'data'; break; }
  //     case 'Imię' : {this.dataToAddForm.value.name = 'firstName'; break; }
  //     case 'Drugie imię' : {this.dataToAddForm.value.name = 'secondName'; break; }
  //     case 'Nazwisko' : {this.dataToAddForm.value.name = 'surename'; break; }
  //     case 'Data urodzenia' : {this.dataToAddForm.value.name = 'dateOfBirth'; break; }
  //     case 'Płeć' : {this.dataToAddForm.value.name = 'sex'; break; }
  //     case 'Numer telefonu' : {this.dataToAddForm.value.name = 'phoneNumber'; break; }
  //     case 'Miejscowość wypełniania formularza' : {this.dataToAddForm.value.name = 'fillLocation'; break; }
  //     case 'Kwalifikacje zawodowe' : {this.dataToAddForm.value.name = 'qualifications'; break; }
  //     case 'Przebieg dotychczasowego zatrudnienia' : {this.dataToAddForm.value.name = 'prevEmployment'; break; }
  //     case 'Dodatkowe dane osobowe' : {this.dataToAddForm.value.name = 'additionaPersonalData'; break; }
  //     case 'Ukończone szkoły' : {this.dataToAddForm.value.name = 'schools'; break; }
  //   }
  // }

  changeSortOrder(newSortOrder: string) {
    this.selectedSortOrder = newSortOrder;
    this.dataToAddForm.value.name = this.selectedSortOrder;
  }

  initializeDataToAdd() {
    this.dataToAddForm = new FormGroup({
      name: new FormControl(null),
      positionX: new FormControl(null),
      positionY: new FormControl(null),
      size: new FormControl(null)
    });
  }

  upload(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.fileForm.patchValue({
          file: reader.result
        });
      };
    }
  }

  validate() {
    if (
      this.dataToAddForm.value.name == null ||
      this.dataToAddForm.value.positionX == null ||
      this.dataToAddForm.value.positionY == null ||
      this.dataToAddForm.value.size == null
    ) {
      return false;
    }
    return true;
  }

  onSubmitData() {
    // this.selectedName();
    if (this.validate()) {
      this.documentGenerator.addMetadata(
        this.dataToAddForm.value.name,
        this.dataToAddForm.value.positionX,
        this.dataToAddForm.value.positionY,
        this.dataToAddForm.value.size);
      this.message = 'Dodano poprawnie';
      this.list.slice(this.dataToAddForm.value.name);
      this.selectedSortOrder = this.defaultSelectedSortOrder;
      // console.log(this.dataToAddForm.value);
    } else {
      this.message = 'Brakuje informacji';
    }
  }

  poppingMessage(content, message) {
    this.message = message;
    this.modalService.open(content, {ariaLabelledBy: 'poppingmassage'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  onSubmitFile() {
    this.documentGenerator.setPDF(this.fileForm.get('file').value);
  }

  previewPDF(){
    this.documentGenerator.previewPDF();
  }

  saveFile() {
    this.documentGenerator.saveFileToDatabase();
  }
}
