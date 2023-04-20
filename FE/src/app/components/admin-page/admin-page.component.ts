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
  currentUsers: any;
  index: number = 0;

  constructor(
    private getDataAuthService: GetDataAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDataAuthService.getUsers().subscribe({
      next: (res) => {
        this.users = res.users;
        this.users.sort((a: { id: number }, b: { id: number }) =>
          a.id > b.id ? 1 : b.id > a.id ? -1 : 0
        );
        this.currentUsers = this.users.slice(0, 5);
        console.log(this.index);
      },
      error: (err) => {
        console.log(err);
        this.router.navigateByUrl('/homePage');
      },
    });
  }

  indietro(): void {
    this.index -= 5;
    this.currentUsers = this.users.slice(this.index, this.index + 5);
    console.log(this.index);
  }

  avanti(): void {
    this.index += 5;
    this.currentUsers = this.users.slice(this.index, this.index + 5);
    console.log(this.index);
  }
}
