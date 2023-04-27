import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ColoriComponent } from './components/colori/colori.component';
import { NomiComponent } from './components/nomi/nomi.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [
  {
    path: 'homePage',
    children: [
      { path: 'nomi', component: NomiComponent },
      { path: 'colori', component: ColoriComponent },
      { path: '', component: HomePageComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'adminPage', component: AdminPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
