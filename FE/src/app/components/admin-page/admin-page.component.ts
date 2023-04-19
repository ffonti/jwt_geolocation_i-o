import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataAuthService } from 'src/app/services/get-data-auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  id: string = '';
  username: string = '';

  constructor(
    private getDataAuthService: GetDataAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDataAuthService.isAdmin().subscribe({
      next: (res) => {
        this.id = res.user.id;
        this.username = res.user.username;
      },
      error: (err) => {
        console.log(err);
        this.router.navigateByUrl('/homePage');
      },
    });
  }
}
