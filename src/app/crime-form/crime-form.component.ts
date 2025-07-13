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

@Component({
  selector: 'app-crime-form',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    stolenItem: new FormControl(),
    fraudMethod: new FormControl(),
    victimName: new FormControl(),
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
      Object.values(values).some((value) => value === null) &&
      !(
        values.damagedPlace ||
        values.fraudMethod ||
        values.stolenItem ||
        values.victimName
      )
    ) {
      console.log(values.damagedPlace);
      console.log('re');
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
    // {
    //   location: null,
    //   dateOccured: null,
    //   crimeType: 'theft',
    //   suspectInfo: {
    //     name: null,
    //     age: null,
    //     address: null,
    //   },
    // }
  }
}
