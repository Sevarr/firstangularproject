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

  async generatePDF() {
    console.log('działa');
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const {width, height} = page.getSize();
    const fontSize = 30;
    page.drawText('Creating PDFs in JavaScript is awesome!', {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0.53, 0.71),
    });
    const pdfBytes = await pdfDoc.save();
    // console.log(pdfBytes);
    // download(pdfBytes, 'pdf-lib_creation_example.pdf', 'application/pdf');


    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const name = 'testowyplik.pdf';
    const blob = new Blob([pdfBytes], {type: 'application/pdf'});
    const url = window.URL.createObjectURL(blob);
    console.log('Blob: ', blob);
    console.log('url: ', url);
    console.log('pdfBytes: ', pdfBytes);
    a.href = url;
    a.download = name;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
