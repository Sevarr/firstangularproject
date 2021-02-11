import { Injectable } from '@angular/core';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { EmployeeDataService } from '../../services/data/employee-data.service';
import { ApiService } from '../api/api.service';
import { AuthService } from '../api/auth.service';

interface Metadata {
  name: string;
  x: number;
  y: number;
  size: number;
}

const METADATA: Metadata[] = [];

@Injectable({
  providedIn: 'root'
})
export class DocumentGeneratorService {
  private url: string;
  private existingPdfBytes: ArrayBuffer;
  private pdfDoc: PDFDocument;
  private pdfDocPreview: PDFDocument;
  private metadataOut = METADATA;
  private metadataIn = METADATA;
  public files = [];
  private file;
  private fileName;

  constructor(private employeeData: EmployeeDataService, private apiService: ApiService, private authService: AuthService) {
  }

  addMetadata(name, positionX, positionY, size) {
    this.metadataOut.push({
      name,
      x: parseInt(positionX),
      y: parseInt(positionY),
      size: parseInt(size)
    });
  }

  private addMetadataToFile() {
    const keywords = [];
    if (this.metadataOut.length > 0) {
      // let i = 0;
      this.metadataOut.forEach(item => {
        keywords.push(item.name);
        keywords.push(item.x);
        keywords.push(item.y);
        keywords.push(item.size);
        keywords.push(';');
        // i++;
      });
      this.pdfDoc.setKeywords(keywords);
    }
  }

  readMetadata(pdfDoc) {
    if (pdfDoc.getKeywords()) {
      let data = pdfDoc.getKeywords().split(' ; ');
      for (let i = 0; data.length > i; i++) {
        let singleData = data[i].split(' ');
        this.metadataOut.push({
          name: (singleData[0]),
          x: parseInt(singleData[1]),
          y: parseInt(singleData[2]),
          size: parseInt(singleData[3])
        });
      }
    }
  }

  private readData(data) {
    const date = new Date();
    if (this.authService.getUserType() === 'worker') {
      // if (data === 'data'){
      //   return (String(date.getDate().toString().padStart(2, '0')) + ' ' + String(date.getMonth() + 1).padStart(2, '0')) + ' ' + String(date.getFullYear());
      // } else if (data === this.employeeData.) {
      //
      // }
      switch (data) {
        case 'data': {
          return (String(date.getDate().toString().padStart(2, '0')) + ' ' + String(date.getMonth() + 1).padStart(2, '0')) + ' ' + String(date.getFullYear());
          break;
        }
        case 'Imie': {
          return this.employeeData.getName();
          break;
        }
        case 'Drugie_imie': {
          return this.employeeData.getName();
          break;
        }
        case 'Nazwisko': {
          return this.employeeData.getName();
          break;
        }
        case 'Data_urodzenia': {
          return this.employeeData.getName();
          break;
        }
        case 'Plec': {
          return this.employeeData.getName();
          break;
        }
        case 'Numer_telefonu': {
          return this.employeeData.getName();
          break;
        }
        case 'Miejscowosc_wypelniania_formularza': {
          return this.employeeData.getName();
          break;
        }
        case 'Kwalifikacje_zawodowe': {
          return this.employeeData.getName();
          break;
        }
        case 'Przebieg_dotychczasowego_zatrudnienia': {
          return this.employeeData.getName();
          break;
        }
        case 'Dodatkowe_dane_osobowe': {
          return this.employeeData.getName();
          break;
        }
        case 'Ukonczone_szkoly': {
          return this.employeeData.getName();
          break;
        }
        default: {
          return '';
          break;
        }
      }
    } else {
      return data;
    }
  }

  private drawText(page, font, pdfDoc) {
    this.readMetadata(pdfDoc);
    for (let i = 0; this.metadataOut.length > i; i++) {
      page.drawText(this.readData(this.metadataOut[i].name), {
        x: this.metadataOut[i].x,
        y: this.metadataOut[i].y,
        size: this.metadataOut[i].size,
        font,
        color: rgb(0, 0, 0),
      });
    }
    this.metadataOut.slice();
  }

  public async setPDF(file) {
    this.file = file;
    this.fileName = file.name;
    this.existingPdfBytes = await fetch(file).then(res => res.arrayBuffer());
    this.pdfDoc = await PDFDocument.load(this.existingPdfBytes);
    this.pdfDocPreview = await PDFDocument.load(this.existingPdfBytes);
    this.addMetadataToFile();
  }

  public async previewPDF() {
    // this.readMetadata();
    let pdfDoc = this.pdfDocPreview;
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    this.drawText(firstPage, helveticaFont, pdfDoc);
    const pdfBytes = await pdfDoc.save();

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const name = this.fileName;
    const blob = new Blob([pdfBytes], {type: 'application/pdf'});
    const url_out = window.URL.createObjectURL(blob);
    a.href = url_out;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url_out);
    this.metadataOut.slice();
  }

  private async modifyDownloadPDF(file, fileName) {
    const existingPdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    this.drawText(firstPage, helveticaFont, pdfDoc);
    const pdfBytes = await pdfDoc.save();

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const name = fileName;
    const blob = new Blob([pdfBytes], {type: 'application/pdf'});
    const url_out = window.URL.createObjectURL(blob);
    a.href = url_out;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url_out);
    this.metadataOut.slice();
  }

  public async saveFileToDatabase() {
    const blob = new Blob([this.fileName, this.file], {type: 'application/pdf'});
    this.apiService.sendFile(blob);
  }

  public generateFile(fileName){
    let file = this.apiService.downloadFile(fileName);
    if (file) {
      this.modifyDownloadPDF(file, fileName);
    } else {
      file = this.apiService.downloadFile(fileName);
    }
  }
}
