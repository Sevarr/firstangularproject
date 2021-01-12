import {Component, OnInit} from '@angular/core';
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';

@Component({
  selector: 'app-document-generator',
  templateUrl: './document-generator.component.html',
  styleUrls: ['./document-generator.component.css']
})
export class DocumentGeneratorComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  metadata;

  addMetadata() {

  }

  readMetadata(data) {
    this.metadata = data.split(' ');
  }

  async modifyPDF() {
    console.log('działa');
    // const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
    const url = '/assets/testowyplik.pdf';
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    pdfDoc.setKeywords(['firstName', '5', '800', '10', 'horses', 'men']);

    this.readMetadata(pdfDoc.getKeywords());
    console.log('Keywords:', this.metadata);
    let x1 = parseInt(this.metadata[1]);
    let y1 = parseInt(this.metadata[2]);
    let z1 = parseInt(this.metadata[3]);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const {width, height} = firstPage.getSize();
    firstPage.drawText('This text was added with JavaScript!\n' +
      'tak', {
        x: x1,
        y: y1,
        size: z1,
      font: helveticaFont,
      color: rgb(0.95, 0.1, 0.1),
    });
    const pdfBytes = await pdfDoc.save();
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
