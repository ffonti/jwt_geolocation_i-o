import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
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
      observe: 'response',
    });
  }
}
