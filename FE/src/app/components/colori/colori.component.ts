import { Component } from '@angular/core';
import { GetDataAuthService } from 'src/app/services/get-data-auth.service';

@Component({
  selector: 'app-colori',
  templateUrl: './colori.component.html',
  styleUrls: ['./colori.component.css'],
})
export class ColoriComponent {
  colori: any;
  constructor(private getDataAuth: GetDataAuthService) {}

  ngOnInit(): void {
    this.getDataAuth.getColori().subscribe({
      next: (res) => {
        this.colori = JSON.stringify(res.colori);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
