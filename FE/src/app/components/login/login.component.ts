import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataService } from 'src/app/services/fetch-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  token: string = '';
  msg: string = '';
  isStatus200: boolean = false;

  constructor(
    private fetchDataService: FetchDataService,
    private router: Router
  ) {}

  submit(): void {
    localStorage.clear();
    this.fetchDataService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log(res);
        this.msg = res.body.msg;
        localStorage.setItem('token', res.body.token);
        localStorage.setItem('id', res.body.id);
        localStorage.setItem('username', res.body.username);
        this.router.navigateByUrl('/homePage');
      },
      error: (err) => {
        console.log(err);
        this.msg = err.error.msg;
      },
    });
  }
}
