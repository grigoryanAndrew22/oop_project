import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeFormComponent } from './crime-form.component';

describe('CrimeFormComponent', () => {
  let component: CrimeFormComponent;
  let fixture: ComponentFixture<CrimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrimeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
