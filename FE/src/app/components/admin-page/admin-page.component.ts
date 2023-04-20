import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataAuthService } from 'src/app/services/get-data-auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  users: any;

  constructor(
    private getDataAuthService: GetDataAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDataAuthService.getUsers().subscribe({
      next: (res) => {
        this.users = res.users;
      },
      error: (err) => {
        console.log(err);
        this.router.navigateByUrl('/homePage');
      },
    });
  }
}
