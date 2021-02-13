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
  }

  changeSortOrder(newSortOrder: string): any {
    this.selectedSortOrder = newSortOrder;
    this.dataToAddForm.value.name = this.selectedSortOrder;
  }

  initializeDataToAdd(): any {
    this.dataToAddForm = new FormGroup({
      name: new FormControl(null),
      positionX: new FormControl(null),
      positionY: new FormControl(null),
      size: new FormControl(null)
    });
  }

  upload(event): any {
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

  validate(): boolean {
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

  onSubmitData(): any {
    if (this.validate()) {
      this.documentGenerator.addMetadata(
        this.dataToAddForm.value.name,
        this.dataToAddForm.value.positionX,
        this.dataToAddForm.value.positionY,
        this.dataToAddForm.value.size);
      this.message = 'Dodano poprawnie';
      this.list.slice(this.dataToAddForm.value.name);
      this.selectedSortOrder = this.defaultSelectedSortOrder;
    } else {
      this.message = 'Brakuje informacji';
    }
  }

  poppingMessage(content, message): any {
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

  onSubmitFile(): any {
    this.documentGenerator.setPDF(this.fileForm.get('file').value);
  }

  previewPDF(): any {
    this.documentGenerator.previewPDF();
  }

  saveFile(): any {
    this.documentGenerator.saveFileToDatabase();
  }
}
