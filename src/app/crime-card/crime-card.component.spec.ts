import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeCardComponent } from './crime-card.component';

describe('CrimeCardComponent', () => {
  let component: CrimeCardComponent;
  let fixture: ComponentFixture<CrimeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrimeCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrimeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
