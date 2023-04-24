import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetDataAuthService } from 'src/app/services/get-data-auth.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
  users: any;
  currentUsers: any;
  index: number = 0;
  flagUsername: boolean = true;
  flagId: boolean = true;
  flagRole: boolean = true;
  pages: number[] = [];
  page: number = 0;
  page2: number = 1;
  showMarker: boolean = false;
  currentUserMarkers: any;
  cerca: string = '';

  constructor(
    private getDataAuthService: GetDataAuthService,
    private mapService: MapService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDataAuthService.getUsers().subscribe({
      next: (res) => {
        this.users = res.users;
        this.users.sort((a: { role: string }, b: { role: string }) =>
          a.role > b.role ? 1 : b.role > a.role ? -1 : 0
        );
        this.currentUsers = this.users.slice(this.index, this.index + 5);
        for (
          let i = 0;
          i < Math.floor(this.users.length / (this.index + 5)) + 1;
          i++
        ) {
          this.pages.push(i);
        }
      },
      error: (err) => {
        console.log(err);
        this.router.navigateByUrl('/homePage');
      },
    });
  }

  indietro(): void {
    this.page2 !== 1 ? this.page2-- : (this.page2 = this.pages.length);
    if (this.index === 0) {
      this.index = ((this.users.length % 5) + 1) * 5;
      this.currentUsers = this.users.slice(this.index, this.index + 5);
    } else {
      this.index -= 5;
      this.currentUsers = this.users.slice(this.index, this.index + 5);
    }
  }

  avanti(): void {
    this.page2 !== this.pages.length ? this.page2++ : (this.page2 = 1);
    if (this.users.length <= this.index + 5) {
      this.index = 0;
      this.currentUsers = this.users.slice(this.index, this.index + 5);
    } else {
      this.index += 5;
      this.currentUsers = this.users.slice(this.index, this.index + 5);
    }
  }

  invertedUsername(): void {
    this.flagUsername = !this.flagUsername;
    if (!this.flagUsername) {
      this.users.sort((a: { username: string }, b: { username: string }) =>
        a.username > b.username ? 1 : b.username > a.username ? -1 : 0
      );
      this.users.reverse();
    } else {
      this.users.reverse();
    }
    this.page2 = 1;
    this.index = 0;
    this.currentUsers = this.users.slice(this.index, this.index + 5);
  }

  invertedId(): void {
    this.flagId = !this.flagId;
    if (!this.flagId) {
      this.users.sort((a: { id: number }, b: { id: number }) =>
        a.id > b.id ? 1 : b.id > a.id ? -1 : 0
      );
      this.users.reverse();
    } else {
      this.users.reverse();
    }
    this.page2 = 1;
    this.index = 0;
    this.currentUsers = this.users.slice(this.index, this.index + 5);
  }

  invertedRole(): void {
    this.flagRole = !this.flagRole;
    if (!this.flagRole) {
      this.users.sort((a: { role: string }, b: { role: string }) =>
        a.role > b.role ? 1 : b.role > a.role ? -1 : 0
      );
      this.users.reverse();
    } else {
      this.users.reverse();
    }
    this.page2 = 1;
    this.index = 0;
    this.currentUsers = this.users.slice(this.index, this.index + 5);
  }

  changedIndex(): void {
    this.index = this.page * 5;
    this.page2 = Number(this.page) + 1;
    this.currentUsers = this.users.slice(this.index, this.index + 5);
  }

  showMarkers(user: any): void {
    if (this.currentUserMarkers === JSON.stringify(user)) {
      this.showMarker = !this.showMarker;
    } else {
      this.mapService.getMarkersFromUser(user).subscribe({
        next: (res) => {
          this.currentUserMarkers = res.markers;
          console.log(this.currentUserMarkers);
        },
        error: (err) => {
          console.log(err);
        },
      });
      if (!this.showMarker) {
        this.showMarker = !this.showMarker;
      }
    }
  }
}
