import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SmoothLinearGradientPageComponent } from './smooth-linear-gradient/smooth-linear-gradient-page.component';
import { HexToRgbaPageComponent } from './hex-to-rgba-page/hex-to-rgba-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'smooth-linear-gradient',
    component: SmoothLinearGradientPageComponent,
  },
  { path: 'hex-to-rgba', component: HexToRgbaPageComponent },
];
