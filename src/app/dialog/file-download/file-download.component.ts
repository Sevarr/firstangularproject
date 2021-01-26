import { Component, OnInit } from '@angular/core';
import { DocumentGeneratorService} from '../../services/documents/document-generator.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent implements OnInit {

  constructor(private documentGenerator: DocumentGeneratorService, private apiService: ApiService) { }

  ngOnInit(): void {
  }

  getFileList(){
    // this.apiService.getFileList();
    console.log(this.apiService.getFileList());
  }
}
