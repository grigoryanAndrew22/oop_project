import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CrimeService } from '../services/crime.service';
import { Arson, Assault, Fraud, Theft } from '../classes/crime.model';
import { Status, Suspect } from '../interfaces/crime.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crime-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './crime-form.component.html',
  styleUrl: './crime-form.component.css',
})
export class CrimeFormComponent {
  private crimeService = inject(CrimeService);

  submitted = false;

  crimeForm = new FormGroup({
    location: new FormControl(null, Validators.required),
    dateOccured: new FormControl(null, Validators.required),
    crimeType: new FormControl('theft'),
    stolenItem: new FormControl(null as any, Validators.required),
    fraudMethod: new FormControl(null as any, Validators.required),
    victimName: new FormControl(null as any, Validators.required),
    damagedPlace: new FormControl(),
    suspectInfo: new FormGroup({
      name: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
    }),
  });

  onSubmit() {
    this.submitted = true;
    const id = Date.now();
    const dateReported = new Date().toISOString().split('T')[0];

    const values = this.crimeForm.value;
    if (
      !values.dateOccured ||
      (Object.values(values).some((value) => value === null) &&
        !(
          values.damagedPlace ||
          values.fraudMethod ||
          values.stolenItem ||
          values.victimName
        ))
    ) {
      return;
    }
    const suspectInfo = this.crimeForm.get('suspectInfo')?.value;
    let suspect: Suspect;
    if (
      suspectInfo &&
      !Object.values(suspectInfo).some((value) => value === null)
    ) {
      suspect = {
        name: suspectInfo.name!,
        age: +suspectInfo.age!,
        address: suspectInfo.address!,
      };
    } else {
      return;
    }

    const initialInfo: [
      number,
      string,
      string,
      string,
      string,
      Suspect,
      Status
    ] = [
      id,
      values.location!,
      dateReported,
      values.dateOccured!,
      'unknown',
      suspect!,
      'Not Started',
    ];
    let crime;
    switch (this.crimeForm.value.crimeType) {
      case 'fraud':
        crime = new Fraud(...initialInfo, 'Fraud', values.fraudMethod);
        break;
      case 'arson':
        crime = new Arson(...initialInfo, 'Arson', values.damagedPlace);
        break;
      case 'theft':
        crime = new Theft(...initialInfo, 'Theft', values.stolenItem);
        break;
      case 'assault':
        crime = new Assault(...initialInfo, 'Assault', values.victimName);
        break;
      default:
        throw new Error('?');
    }

    this.crimeService.addCrime(crime);
    this.submitted = false;
    this.crimeForm.reset({ crimeType: 'theft' });
  }
}
