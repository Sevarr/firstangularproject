import {Component, OnInit} from '@angular/core';
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import { EmployeeDataService } from '../services/data/employee-data.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-document-generator',
  templateUrl: './document-generator.component.html',
  styleUrls: ['./document-generator.component.css']
})
export class DocumentGeneratorComponent implements OnInit {
  private url: string;
  private existingPdfBytes: ArrayBuffer;
  private pdfDoc: PDFDocument;

  constructor(private employeeData: EmployeeDataService) {
  }
  metadata = [];

  ngOnInit(): void {
  }

  addMetadata() {
    this.pdfDoc.setKeywords(['firstName', '5', '800', '10', '; ', 'firstName', '6', '800', '10', '; ', 'firstName', '7', '800', '10', '; ', 'firstName', '8', '800', '10', '; ', 'firstName', '9', '800', '10', '; ']);
  }

  readMetadata() {
    let data = this.pdfDoc.getKeywords().split('; ');
    console.log('Data:', data);
    for (let i = 0; data.length > i; i = i++){
      // this.metadata[i] = data;
    }
    // console.log('metatesto:', this.metadata);f
  }

  readData(data){
    switch (data) {
      case 'firstName': {
        return this.employeeData.getName();
        break;
      }
      default: {
        break;
      }
    }
  }


  drawText(firstPage, data, x, y, size, font){
    firstPage.drawText(this.readData('firstName'), {
      x,
      y,
      size,
      font,
      color: rgb(0, 0, 0),
    });
  }

  async modifyPDF() {
    console.log('działa');
    // const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
    this.url = '/assets/testowyplik.pdf';
    this.existingPdfBytes = await fetch(this.url).then(res => res.arrayBuffer());
    this.pdfDoc = await PDFDocument.load(this.existingPdfBytes);

    const helveticaFont = await this.pdfDoc.embedFont(StandardFonts.Helvetica);
    this.addMetadata();
    this.readMetadata();
    // console.log(this.readData('firstName'));
    // console.log('Keywords:', this.metadata);
    // let x = parseInt(this.metadata[1]);
    // let y = parseInt(this.metadata[2]);
    // let size = parseInt(this.metadata[3]);
    const pages = this.pdfDoc.getPages();
    const firstPage = pages[0];
    const {width, height} = firstPage.getSize();
    // this.drawText(firstPage, this.readData('firstName'), this.metadata[1].x, this.metadata[1].y, this.metadata[1].size, helveticaFont);
    this.drawText(firstPage, this.readData('firstName'), 1, 1, 1, helveticaFont);
    const pdfBytes = await this.pdfDoc.save();
    // console.log(pdfBytes);
    // download(pdfBytes, 'pdf-lib_creation_example.pdf', 'application/pdf');


    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const name = 'testowyplik.pdf';
    const blob = new Blob([pdfBytes], {type: 'application/pdf'});
    const url_out = window.URL.createObjectURL(blob);
    console.log('Blob: ', blob);
    console.log('url_out: ', url_out);
    console.log('pdfBytes: ', pdfBytes);
    a.href = url_out;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url_out);
  }

  // upload(){
  //   // http://localhost:8080/uploadFiles
  // }
}



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
