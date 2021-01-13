import {Component, OnInit} from '@angular/core';
import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import {EmployeeDataService} from '../services/data/employee-data.service';
import {RestService} from '../services/rest/rest.service';
import {FormControl, FormGroup} from '@angular/forms';

interface Metadata {
  name: string;
  x: number;
  y: number;
  size: number;
}

const METADATA: Metadata[] = [];

@Component({
  selector: 'app-document-generator',
  templateUrl: './document-generator.component.html',
  styleUrls: ['./document-generator.component.css']
})
export class DocumentGeneratorComponent implements OnInit {
  private url: string;
  private existingPdfBytes: ArrayBuffer;
  private pdfDoc: PDFDocument;
  fileForm: FormGroup;
  private fileName;
  metadataOut = METADATA;
  metadataIn = METADATA;

  constructor(private employeeData: EmployeeDataService, private restService: RestService) {
  }

  // metadata = [];

  ngOnInit(): void {
    this.fileForm = new FormGroup({
      file: new FormControl(null)
    });
  }

  addMetadata() {
    // this.pdfDoc.setKeywords(['firstName', '5', '800', '10', ';', 'firstName', '67', '800', '10', ';', 'firstName', '75', '800', '10', ';', 'firstName', '84', '800', '10', ';', 'firstName', '129', '800', '10']);
  }

  readMetadata() {
    if (this.pdfDoc.getKeywords()) {
      let data = this.pdfDoc.getKeywords().split('; ');
      console.log('Data:', data);
      for (let i = 0; data.length > i; i++) {
        let singleData = data[i].split(' ');
        console.log('Singledata: ', singleData);
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


  // private drawText(page, data, x, y, size, font) {
  private drawText(page, font) {
    this.readMetadata();
    for (let i = 0; this.metadataOut.length > i; i++) {
      console.log('to nie moze byc undefined: ', this.metadataOut[i].name);
      console.log('to nie moze byc undefined: ', this.metadataOut[i].x);
      console.log('to nie moze byc undefined: ', this.metadataOut[i].y);
      console.log('to nie moze byc undefined: ', this.metadataOut[i].size);
    page.drawText(this.readData(this.metadataOut[i].name), {
      x: this.metadataOut[i].x,
      y: this.metadataOut[i].y,
      size: this.metadataOut[i].size,
      font,
      color: rgb(0, 0, 0),
    });
    }
  }

  async modifyPDF() {
    console.log('działa');
    // const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
    this.url = '/assets/testowyplik.pdf';
    this.existingPdfBytes = await fetch(this.url).then(res => res.arrayBuffer());
    // this.existingPdfBytes = await fetch(this.fileForm.get('file').value).then(res => res.arrayBuffer());
    this.pdfDoc = await PDFDocument.load(this.existingPdfBytes);

    const helveticaFont = await this.pdfDoc.embedFont(StandardFonts.Helvetica);
    this.addMetadata();
    // this.readMetadata();
    // console.log(this.readData('firstName'));
    // console.log('Keywords:', this.metadata);
    // let x = parseInt(this.metadata[1]);
    // let y = parseInt(this.metadata[2]);
    // let size = parseInt(this.metadata[3]);
    const pages = this.pdfDoc.getPages();
    const firstPage = pages[0];
    const {width, height} = firstPage.getSize();
    // this.drawText(firstPage, this.readData('firstName'), this.metadata[1].x, this.metadata[1].y, this.metadata[1].size, helveticaFont);
    this.drawText(firstPage, helveticaFont);
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

  upload(event) {
    // console.log('test', this.fileForm.value.file);
    // this.restService.sendFile(this.fileForm.value.file);
    console.log('test', this.fileForm.get('file').value);

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

  onSubmit() {
    console.log(this.fileName); // , this.fileForm.get('file').value);
    // this.restService.sendFile(this.fileForm.get('file').value);
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
