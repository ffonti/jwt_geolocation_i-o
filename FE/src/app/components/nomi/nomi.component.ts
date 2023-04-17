import { Component, OnInit } from '@angular/core';
import { GetDataAuthService } from 'src/app/services/get-data-auth.service';

@Component({
  selector: 'app-nomi',
  templateUrl: './nomi.component.html',
  styleUrls: ['./nomi.component.css'],
})
export class NomiComponent implements OnInit {
  nomi: any;
  constructor(private getDataAuth: GetDataAuthService) {}

  ngOnInit(): void {
    this.getDataAuth.getNomi().subscribe({
      next: (res) => {
        this.nomi = JSON.stringify(res.nomi);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
