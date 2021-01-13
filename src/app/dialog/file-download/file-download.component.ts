import { Component, OnInit } from '@angular/core';
import { DocumentGeneratorService} from '../../services/documents/document-generator.service';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent implements OnInit {

  constructor(private documentGenerator: DocumentGeneratorService) { }

  ngOnInit(): void {
  }

}
