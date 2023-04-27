import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  selectedFile: File[] = [];
  uploadProgress: string[] = [];

  constructor(private fetchData: FetchDataService) {}

  onFileSelected(event: any): void {
    for (let file of event.target.files) {
      this.selectedFile.push(file);
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
  }

  removeFile(event: any): void {
    this.selectedFile = this.selectedFile.filter((file) => {
      return file.name != event.target.innerText;
    });
  }
}
