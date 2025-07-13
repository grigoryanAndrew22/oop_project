import { Component, inject, input } from '@angular/core';
import { Crime } from '../classes/crime.model';
import { Status } from '../interfaces/crime.interface';
import { CrimeService } from '../services/crime.service';

@Component({
  selector: 'app-crime-card',
  standalone: true,
  imports: [],
  templateUrl: './crime-card.component.html',
  styleUrl: './crime-card.component.css',
})
export class CrimeCardComponent {
  private crimeService = inject(CrimeService);
  crimes = input.required<Crime[]>();
  crime = input.required<Crime>();

  outputCrime(id: number) {
    const crime = this.crimes().find((crime) => crime.id === id);
    console.log(crime);
    console.log(crime?.investigate());
    this.crimeService.updateCrimes();
  }

  applyRandomStatus(id: number, event: Event) {
    event.stopPropagation();
    const statuses: Status[] = [
      'Canceled',
      'Not Started',
      'On Hold',
      'Solved',
      'Under Investigation',
      'Unknown',
    ];
    const crime = this.crimes().find((crime) => crime.id === id);
    const index = Math.floor(Math.random() * 6);

    if (crime) {
      crime.modifyStatus(statuses[index]);
      this.crimeService.updateCrimes();
    }
  }
}
