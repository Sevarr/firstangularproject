import { Injectable, OnInit } from '@angular/core';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { EmployeeDataService } from '../../services/data/employee-data.service';
import { ApiService } from '../api/api.service';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { first } from 'rxjs/operators';

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
    // this.employeeData.getData();
  }

  addMetadata(name, positionX, positionY, size) {
    this.metadataOut.push({
      name,
      x: parseInt(positionX),
      y: parseInt(positionY),
      size: parseInt(size)
    });
    // console.log('Dodane Metadata: ', this.metadataIn);
    // this.pdfDoc.setKeywords(['firstName', '5', '800', '10', ';', 'firstName', '67', '800', '10', ';', 'firstName', '75', '800', '10', ';', 'firstName', '84', '800', '10', ';', 'firstName', '129', '800', '10']);
  }

  private addMetadataToFile() {
    // // this.pdfDoc.setKeywords([]);
    // console.log('Metadata do dodania do pliku pdf: ', this.metadataIn);
    // let data = null;
    // if (this.metadataIn) {
    //   for (let i = 0; this.metadataIn.length > i; i++) {
    //     if (data === undefined) {
    //       data = (this.metadataIn[i].name + ' ' + this.metadataIn[i].x + ' ' + this.metadataIn[i].y + ' ' + this.metadataIn[i].size + ' ' + ';');
    //     } else {
    //       data = (data + ' ' + this.metadataIn[i].name + ' ' + this.metadataIn[i].x + ' ' + this.metadataIn[i].y + ' ' + this.metadataIn[i].size + ' ' + ';');
    //     }
    //   }
    // }
    // console.log('Metadata połączone do dodania do pliku pdf: ', data);
    // return data;

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



      // for (let i = 0; data.length > i; i++) {
      //   let singleData = data[i].split(' ');
        // this.metadataIn.({
        //   name: (singleData[0]),
        //   x: parseInt(singleData[1]),
        //   y: parseInt(singleData[2]),
        //   size: parseInt(singleData[3])
        // });

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

  // private previewData(){
  //
  // }

  // private drawText(page, data, x, y, size, font) {
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

  // public async generatePDF() {
  //   // this.existingPdfBytes = await fetch(this.file).then(res => res.arrayBuffer());
  //   // this.pdfDoc = await PDFDocument.load(this.existingPdfBytes);
  //
  //   // this.pdfDoc.setKeywords(this.addMetadataToFile());
  //   // this.addMetadataToFile();
  //   // const pdfBytes = await this.pdfDoc.save();
  //   //
  //   // const a = document.createElement('a');
  //   // document.body.appendChild(a);
  //   // const blob = new Blob([pdfBytes], {type: 'application/pdf'});
  // }

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
    // console.log('Blob: ', blob);
    // console.log('url_out: ', url_out);
    // console.log('pdfBytes: ', pdfBytes);
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
    // this.readMetadata(pdfDoc);

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

  public async saveFileToDataBase() {

    // Send to data base, nie działa na razie
    // const blob = new Blob([file], {type: 'application/pdf'});
    // Właściwe połączenie z DB
    // const bleb = new Blob([this.file], {type: 'application/pdf'});
    // this.apiService.sendFile(bleb);

    // Testowo dopóki DB nie działa
    const pdfBytes = await this.pdfDoc.save();
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const name = this.fileName;
    const blob = new Blob([pdfBytes], {type: 'application/pdf'});
    const url_out = window.URL.createObjectURL(blob);
    // console.log('Blob: ', blob);
    // console.log('url_out: ', url_out);
    // console.log('pdfBytes: ', pdfBytes);
    a.href = url_out;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url_out);
  }



  public generateFile(fileName){
    let file = this.apiService.downloadFile(fileName);
    // let run = false;
    // while (!run) {
    if (file) {
      // run = true;
      this.modifyDownloadPDF(file, fileName);
      // console.log('Tu jest pobrany plik: ', file);
    } else {
      file = this.apiService.downloadFile(fileName);
    }
  }
  // }
}

  // async modifyPDF(file) {
  //   console.log('działa');
  //   // const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
  //   this.url = '/assets/testowyplik.pdf';
  //   // this.existingPdfBytes = await fetch(this.url).then(res => res.arrayBuffer());
  //   this.existingPdfBytes = await fetch(file).then(res => res.arrayBuffer());
  //   this.pdfDoc = await PDFDocument.load(this.existingPdfBytes);
  //
  //   const helveticaFont = await this.pdfDoc.embedFont(StandardFonts.Helvetica);
  //   // this.addMetadata();
  //   this.addMetadataToFile();
  //   this.readMetadata();
  //   // console.log(this.readData('firstName'));
  //   // console.log('Keywords:', this.metadata);
  //   // let x = parseInt(this.metadata[1]);
  //   // let y = parseInt(this.metadata[2]);
  //   // let size = parseInt(this.metadata[3]);
  //   const pages = this.pdfDoc.getPages();
  //   const firstPage = pages[0];
  //   const { width, height } = firstPage.getSize();
  //   // this.drawText(firstPage, this.readData('firstName'), this.metadata[1].x, this.metadata[1].y, this.metadata[1].size, helveticaFont);
  //   this.drawText(firstPage, helveticaFont);
  //   const pdfBytes = await this.pdfDoc.save();
  //   // console.log(pdfBytes);
  //   // download(pdfBytes, 'pdf-lib_creation_example.pdf', 'application/pdf');
  //
  //
  //   const a = document.createElement('a');
  //   document.body.appendChild(a);
  //   a.style.display = 'none';
  //   const name = 'testowyplik.pdf';
  //   const blob = new Blob([pdfBytes], {type: 'application/pdf'});
  //   const url_out = window.URL.createObjectURL(blob);
  //   console.log('Blob: ', blob);
  //   console.log('url_out: ', url_out);
  //   console.log('pdfBytes: ', pdfBytes);
  //   a.href = url_out;
  //   a.download = name;
  //   a.click();
  //   window.URL.revokeObjectURL(url_out);
  // }

  // saveFile(file) {
  //   // this.addMetadataToFile();
  //   // console.log('Plik do wysłania do DB: ', file);
  //   this.modifyPDF(file);
  //   // this.files.push(file);
  //   // this.saveFileToDataBase(file);
  //   // this.metadataIn;
  // }




//
//
// import {Component, OnInit} from '@angular/core';
// import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
//
// @Component({
//   selector: 'app-document-generator',
//   templateUrl: './document-generator.component.html',
//   styleUrls: ['./document-generator.component.css']
// })
// export class DocumentGeneratorComponent implements OnInit {
//
//   constructor() {
//   }
//
//   ngOnInit(): void {
//   }
//
//   async generatePDF() {
//     console.log('działa');
//     const pdfDoc = await PDFDocument.create();
//     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
//
//     const page = pdfDoc.addPage();
//     const {width, height} = page.getSize();
//     const fontSize = 30;
//     page.drawText('Creating PDFs in JavaScript is awesome!', {
//       x: 50,
//       y: height - 4 * fontSize,
//       size: fontSize,
//       font: timesRomanFont,
//       color: rgb(0, 0.53, 0.71),
//     });
//     const pdfBytes = await pdfDoc.save();
//     // console.log(pdfBytes);
//     // download(pdfBytes, 'pdf-lib_creation_example.pdf', 'application/pdf');
//
//
//     const a = document.createElement('a');
//     document.body.appendChild(a);
//     a.style.display = 'none';
//     const name = 'testowyplik.pdf';
//     const blob = new Blob([pdfBytes], {type: 'application/pdf'});
//     const url = window.URL.createObjectURL(blob);
//     console.log('Blob: ', blob);
//     console.log('url: ', url);
//     console.log('pdfBytes: ', pdfBytes);
//     a.href = url;
//     a.download = name;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   }
// }
