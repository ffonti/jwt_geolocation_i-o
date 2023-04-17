import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataAuthService {
  tokenHeader = new HttpHeaders({
    'x-access-token': localStorage.getItem('token')
      ? `${localStorage.getItem('token')}`
      : '',
  });

  constructor(private http: HttpClient) {}

  getNomi(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/homePage/nomi', {
      headers: this.tokenHeader,
    });
  }

  getColori(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/homePage/colori', {
      headers: this.tokenHeader,
    });
  }
}
