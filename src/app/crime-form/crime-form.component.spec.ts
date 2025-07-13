import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrimeFormComponent } from './crime-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrimeService } from '../services/crime.service';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { routes } from '../app.routes';

describe('CrimeFormComponent', () => {
  let component: CrimeFormComponent;
  let fixture: ComponentFixture<CrimeFormComponent>;
  let crimeServiceSpy: jasmine.SpyObj<CrimeService>;

  beforeEach(async () => {
    crimeServiceSpy = jasmine.createSpyObj('CrimeService', ['addCrime']);

    await TestBed.configureTestingModule({
      imports: [CrimeFormComponent, ReactiveFormsModule],
      providers: [
        { provide: CrimeService, useValue: crimeServiceSpy },
        provideRouter(routes),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CrimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create crime form', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as invalid when required fields are missing', () => {
    component.crimeForm.patchValue({
      location: null,
      dateOccured: null,
    });
    expect(component.crimeForm.invalid).toBeTrue();
  });

  it('should not submit when form is invalid', () => {
    component.crimeForm.patchValue({
      location: null,
      dateOccured: null,
    });
    component.onSubmit();
    expect(crimeServiceSpy.addCrime).not.toHaveBeenCalled();
  });

  it('should submit a theft crime when form is valid', () => {
    component.crimeForm.patchValue({
      location: 'City Center' as any,
      dateOccured: '2024-01-01' as any,
      crimeType: 'theft',
      stolenItem: 'Phone' as any,
      suspectInfo: {
        name: 'John Doe' as any,
        age: 30 as any,
        address: '123 Main St' as any,
      },
    });
    component.onSubmit();
    expect(crimeServiceSpy.addCrime).toHaveBeenCalled();
  });

  it('should reset form after successful submission', () => {
    component.crimeForm.patchValue({
      location: 'Downtown' as any,
      dateOccured: '2024-05-10' as any,
      crimeType: 'fraud',
      fraudMethod: 'Phishing',
      suspectInfo: {
        name: 'Jane Smith' as any,
        age: 28 as any,
        address: '456 Elm St' as any,
      },
    });
    component.onSubmit();
    expect(component.crimeForm.value.crimeType).toBe('theft');
    expect(component.submitted).toBeFalse();
  });
});
