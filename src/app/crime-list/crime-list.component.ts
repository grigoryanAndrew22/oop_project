import { Component, inject, OnInit } from '@angular/core';
import { CrimeService } from '../services/crime.service';
import { Status } from '../interfaces/crime.interface';
import { CrimeCardComponent } from '../crime-card/crime-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crime-list',
  standalone: true,
  imports: [CrimeCardComponent, RouterLink],
  templateUrl: './crime-list.component.html',
  styleUrl: './crime-list.component.css',
})
export class CrimeListComponent implements OnInit {
  private crimeService = inject(CrimeService);
  crimes = this.crimeService.crimes;

  ngOnInit(): void {
    console.log(this.crimes());
  }
}
