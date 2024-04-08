import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SmoothLinearGradientComponent } from './smooth-linear-gradient/smooth-linear-gradient.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'smooth-linear-gradient', component: SmoothLinearGradientComponent },
];
