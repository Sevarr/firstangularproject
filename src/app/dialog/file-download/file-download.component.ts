import { Component, OnInit } from '@angular/core';
import { DocumentGeneratorService} from '../../services/documents/document-generator.service';
import { ApiService } from '../../services/api/api.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent implements OnInit {

  closeResult = '';
  fileList: string = null;
  sortOrders: string;
  defaultSelectedSortOrder = 'Wybierz plik do wygenerowania';
  selectedSortOrder = this.defaultSelectedSortOrder;
  private message: string;

  constructor(private documentGenerator: DocumentGeneratorService, private apiService: ApiService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
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

  getFileList(): any {
    this.fileList = this.apiService.getFileList();
    this.sortOrders = this.fileList;
  }

  changeSortOrder(newSortOrder: string): any {
    this.selectedSortOrder = newSortOrder;
  }

  downloadFile(content): any {
    if (this.selectedSortOrder !== this.defaultSelectedSortOrder) {
      this.documentGenerator.generateFile(this.selectedSortOrder);
      this.message = 'Pobieranie';
    } else { this.message = 'Wybierz plik do pobrania'; }
    this.poppingMessage(content, this.message);
  }
}
