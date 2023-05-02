import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  userData = new HttpHeaders({
    'x-access-token': localStorage.getItem('token')
      ? `${localStorage.getItem('token')}`
      : '',
    id: localStorage.getItem('id') ? `${localStorage.getItem('id')}` : '',
    username: localStorage.getItem('username')
      ? `${localStorage.getItem('username')}`
      : '',
    role: localStorage.getItem('role') ? `${localStorage.getItem('role')}` : '',
  });

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/v1/register',
      {
        username,
        password,
      },
      { observe: 'response' }
    );
    // .pipe(
    //   catchError((err) => {
    //     console.log(err);

    //     if (err.status === 400) {
    //       console.log('Errore Durante la registrazione');
    //     }

    //     return throwError(() => new Error(err));
    //   })
    // );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/v1/login',
      {
        username,
        password,
      },
      { observe: 'response' }
    );
  }

  upload(formdata: FormData): Observable<any> {
    return this.http.post('http://localhost:3000/api/v1/uploadFile', formdata, {
      reportProgress: true,
      headers: this.userData,
      observe: 'response',
    });
  }

  getFileNames(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/uploadFile/getFiles', {
      headers: this.userData,
      observe: 'response',
    });
  }

  downloadFile(name: string): Observable<any> {
    return this.http.get(
      'http://localhost:3000/api/v1/uploadFile/getFiles/' + name,
      { observe: 'response', responseType: 'blob' }
    );
  }
}
