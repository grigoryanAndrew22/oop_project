import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeListComponent } from './crime-list.component';
import { provideRouter, RouterLink } from '@angular/router';
import { routes } from '../app.routes';

describe('CrimeListComponent', () => {
  let component: CrimeListComponent;
  let fixture: ComponentFixture<CrimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrimeListComponent, RouterLink],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(CrimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create crime list component', () => {
    expect(component).toBeTruthy();
  });
});
