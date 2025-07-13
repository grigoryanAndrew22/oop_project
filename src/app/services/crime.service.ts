import { effect, Injectable, signal } from '@angular/core';
import { Crime } from '../classes/crime.model';

@Injectable({
  providedIn: 'root',
})
export class CrimeService {
  private allCrimes = signal<Crime[]>(this.loadCrimes());
  crimes = this.allCrimes.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem('crimes', JSON.stringify(this.allCrimes()));
    });
  }

  private loadCrimes(): Crime[] {
    const data = localStorage.getItem('crimes');
    try {
      const parsed = data ? JSON.parse(data) : [];
      return parsed.map(Crime.fromJSON);
    } catch {
      return [];
    }
  }

  addCrime(crime: Crime) {
    this.allCrimes.update((prevCrimes) => [...prevCrimes, crime]);
  }

  deleteCrime(id: number) {
    this.allCrimes.update((prevCrimes) =>
      prevCrimes.filter((c) => c.id !== id)
    );
  }

  updateCrimes(): void {
    this.allCrimes.update((crimes) => [...crimes]);
  }
}
