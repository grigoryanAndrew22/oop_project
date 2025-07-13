import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeListComponent } from './crime-list.component';

describe('CrimeListComponent', () => {
  let component: CrimeListComponent;
  let fixture: ComponentFixture<CrimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrimeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
