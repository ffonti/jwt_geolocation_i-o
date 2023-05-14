import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
  ) {}

  submit(): void {
    localStorage.clear();
    this.fetchDataService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.msg = res.body.msg;
        localStorage.setItem('token', res.body.token);
        localStorage.setItem('id', res.body.id);
        localStorage.setItem('username', res.body.username);
        localStorage.setItem('role', res.body.role);
        this.router.navigateByUrl('/homePage');
        this.toastr.success('Accesso eseguito!');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.msg);
      },
    });
  }
}
