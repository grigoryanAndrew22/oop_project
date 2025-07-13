import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CrimeListComponent } from './crime-list/crime-list.component';
import { CrimeFormComponent } from './crime-form/crime-form.component';
import { CrimeCardComponent } from './crime-card/crime-card.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crime_list', component: CrimeListComponent },
  { path: 'crime_form', component: CrimeFormComponent },
  { path: 'crime_card/:id', component: CrimeCardComponent },
  { path: '**', component: HomeComponent },
];
