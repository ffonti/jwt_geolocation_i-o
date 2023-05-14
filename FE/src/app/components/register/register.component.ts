import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataService } from 'src/app/services/fetch-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  msg: string = '';

  constructor(
    private fetchDataService: FetchDataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submit(): void {
    this.fetchDataService.register(this.username, this.password).subscribe({
      next: (res) => {
        console.log(res);
        this.msg = res.body.msg;
        this.router.navigateByUrl('/login');
        this.toastr.success('Utente registrato!');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error.msg);
      },
    });
  }
}
