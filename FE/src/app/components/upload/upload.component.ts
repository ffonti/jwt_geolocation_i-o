import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import * as fs from 'file-saver';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  selectedFile: File[] = [];
  uploadProgress: string[] = [];
  viewNames: boolean = true;
  fileNames: string[] = [];
  viewSelectedFile: boolean = false;
  name: string = '';
  file?: Blob;
  fileExists: boolean = false;
  showModal: boolean = false;

  constructor(private fetchData: FetchDataService) {}

  ngOnInit(): void {
    this.fileNames = [];
    this.fetchData.getFileNames().subscribe({
      next: (res) => {
        for (let name of res.body.fileNames) {
          this.fileNames.push(name.original_name);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFileSelected(event: any): void {
    for (let file of event.target.files) {
      if (file.size > 10000000) {
        console.log('Dimensione massima 10MB');
        event.target.value = '';
        this.selectedFile = [];
        return;
      } else if (
        !file.name.includes('.pdf') &&
        !file.name.includes('.docx') &&
        !file.name.includes('.jpg')
      ) {
        console.log('Inserire solo .pdf o .docx o .jpg');
        return;
      } else if (this.fileNames.includes(file.name)) {
        console.log('Esiste già un file con questo nome');
        return;
      } else {
        this.selectedFile.push(file);
      }
    }
    this.showModal = true;
  }

  onUpload(): void {
    const formdata = new FormData();

    if (this.selectedFile != undefined) {
      for (let file of this.selectedFile) {
        formdata.append('documents', file, file.name);
        this.fileNames.push(file.name);
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

  removeFile(fileName: string): void {
    this.selectedFile = this.selectedFile.filter((file) => {
      return file.name != fileName;
    });
  }

  getFileNames(): void {
    this.viewNames = !this.viewNames;
    this.viewSelectedFile = false;
  }

  viewFile(event: any): void {
    if (this.name !== event.target.innerText) {
      this.name = event.target.innerText;
      this.viewSelectedFile = true;
    } else {
      this.viewSelectedFile = !this.viewSelectedFile;
    }
  }

  downloadFile(): void {
    this.fetchData.downloadFile(this.name).subscribe({
      next: (res) => {
        fs.saveAs(res.body, this.name);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteFile(): void {
    this.fetchData.deleteFile(this.name).subscribe({
      next: (res) => {
        console.log(res);
        let index = this.fileNames.indexOf(this.name);
        if (index !== -1) {
          this.fileNames.splice(index, 1);
        }
        this.viewSelectedFile = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleModal(): void {
    this.showModal = false;
  }

  clearFiles(): void {
    this.selectedFile = [];
  }
}
