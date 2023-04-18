import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDataAuthService {
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

  getNomi(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/homePage/nomi', {
      headers: this.userData,
    });
  }

  getColori(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/homePage/colori', {
      headers: this.userData,
    });
  }

  isAdmin(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/adminPage', {
      headers: this.userData,
    });
  }
}
