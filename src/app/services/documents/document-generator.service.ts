import { Injectable } from '@angular/core';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { EmployeeDataService } from '../data/employee-data.service';
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
  private existingPdfBytes: ArrayBuffer;
  private pdfDoc: PDFDocument;
  private pdfDocPreview: PDFDocument;
  private metadataOut = METADATA;
  public files = [];
  private file;
  private fileName;

  constructor(private employeeData: EmployeeDataService, private apiService: ApiService, private authService: AuthService) {
  }

  addMetadata(name, positionX, positionY, size): any {
    this.metadataOut.push({
      name,
      // tslint:disable-next-line:radix
      x: parseInt(positionX),
      // tslint:disable-next-line:radix
      y: parseInt(positionY),
      // tslint:disable-next-line:radix
      size: parseInt(size)
    });
  }

  private addMetadataToFile(): any {
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
      this.pdfDocPreview.setKeywords(keywords);
    }
  }

  readMetadata(pdfDoc): any {
    if (pdfDoc.getKeywords()) {
      const data = pdfDoc.getKeywords().split(' ; ');
      for (let i = 0; data.length > i; i++) {
        const singleData = data[i].split(' ');
        this.metadataOut.push({
          name: (singleData[0]),
          // tslint:disable-next-line:radix
          x: parseInt(singleData[1]),
          // tslint:disable-next-line:radix
          y: parseInt(singleData[2]),
          // tslint:disable-next-line:radix
          size: parseInt(singleData[3])
        });
      }
    }
  }

  private readData(data) {
    const date = new Date();
    if (this.authService.getUserType() === 'worker') {
      switch (data) {
        case 'data': {
          // tslint:disable-next-line:max-line-length
          return (String(date.getDate().toString().padStart(2, '0')) + ' ' + String(date.getMonth() + 1).padStart(2, '0')) + ' ' + String(date.getFullYear());
        }
        case 'Imie': {
          return this.employeeData.getName();
        }
        case 'Drugie_imie': {
          return this.employeeData.getSecondName();
        }
        case 'Nazwisko': {
          return this.employeeData.getSurname();
        }
        case 'Data_urodzenia': {
          return this.employeeData.getBirthDate();
        }
        case 'Plec': {
          return this.employeeData.getSex();
        }
        case 'Numer_telefonu': {
          return this.employeeData.getPhoneNumber();
        }
        case 'Miejscowosc_wypelniania_formularza': {
          return this.employeeData.getFillLocation();
        }
        case 'Kwalifikacje_zawodowe': {
          return this.employeeData.getQualifications();
        }
        case 'Przebieg_dotychczasowego_zatrudnienia': {
          return this.employeeData.getPrevEmployment();
        }
        case 'Dodatkowe_dane_osobowe': {
          return this.employeeData.getAdditionalPersonalData();
        }
        case 'Ukonczone_szkoly': {
          return this.employeeData.getEducation();
        }
        default: {
          return '';
        }
      }
    } else {
      return data;
    }
  }

  private drawText(page, font, pdfDoc): any {
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

  public async setPDF(file): Promise<void> {
    this.file = file;
    this.fileName = file.name;
    this.existingPdfBytes = await fetch(file).then(res => res.arrayBuffer());
    this.pdfDoc = await PDFDocument.load(this.existingPdfBytes);
    this.pdfDocPreview = await PDFDocument.load(this.existingPdfBytes);
    this.addMetadataToFile();
  }

  public async previewPDF(): Promise<void> {
    const pdfDoc = this.pdfDocPreview;
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const {} = firstPage.getSize();
    this.drawText(firstPage, helveticaFont, pdfDoc);
    const pdfBytes = await pdfDoc.save();

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const name = this.fileName;
    const blob = new Blob([pdfBytes], {type: 'application/pdf'});
    const urlOut = window.URL.createObjectURL(blob);
    a.href = urlOut;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(urlOut);
    this.metadataOut.slice();
  }

  private async modifyDownloadPDF(file, fileName): Promise<void> {
    const existingPdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const {} = firstPage.getSize();
    this.drawText(firstPage, helveticaFont, pdfDoc);
    const pdfBytes = await pdfDoc.save();
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const name = fileName;
    const blob = new Blob([pdfBytes], {type: 'application/pdf'});
    const urlOut = window.URL.createObjectURL(blob);
    a.href = urlOut;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(urlOut);
    this.metadataOut.slice();
  }

  public async saveFileToDatabase(): Promise<void> {
    const blob = new Blob([this.fileName, this.file] , {type: 'application/pdf'});
    this.apiService.sendFile(blob);
  }

  public generateFile(fileName): void {
    const file = this.apiService.downloadFile(fileName);
    if (file) {
      this.modifyDownloadPDF(file, fileName);
    } else {
      this.file = this.apiService.downloadFile(fileName);
    }
  }
}
