import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import * as fs from 'file-saver';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  selectedFile: File[] = [];
  uploadProgress: string[] = [];
  viewFiles: boolean = false;

  constructor(private fetchData: FetchDataService) {}

  onFileSelected(event: any): void {
    for (let file of event.target.files) {
      if (file.size > 10000000) {
        console.log('Dimensione massima 10MB');
        event.target.value = '';
        this.selectedFile = [];
      } else if (
        !file.name.includes('.pdf') &&
        !file.name.includes('.docx') &&
        !file.name.includes('.jpg')
      ) {
        console.log('Inserire solo .pdf o .docx o .jpg');
      } else {
        this.selectedFile.push(file);
      }
    }
  }

  onUpload(): void {
    const formdata = new FormData();

    if (this.selectedFile != undefined) {
      for (let file of this.selectedFile) {
        formdata.append('documents', file, file.name);
      }
    }

    this.fetchData.upload(formdata).subscribe({
      next: (event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress.push(
            'Upload Progress: ' +
              Math.round((event.loaded / event.total) * 100) +
              '%'
          );
          console.log(
            'Upload Progress: ' +
              Math.round((event.loaded / event.total) * 100) +
              '%'
          );
        } else if (event.type == HttpEventType.Response) {
          console.log(event);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.selectedFile = [];
  }

  removeFile(event: any): void {
    this.selectedFile = this.selectedFile.filter((file) => {
      return file.name != event.target.innerText;
    });
  }

  getFiles(): void {
    if (!this.viewFiles) {
      this.viewFiles = !this.viewFiles;
      this.fetchData.getFiles().subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.viewFiles = !this.viewFiles;
    }
  }
}
