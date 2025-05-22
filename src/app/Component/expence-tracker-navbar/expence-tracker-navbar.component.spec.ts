import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenceTrackerNavbarComponent } from './expence-tracker-navbar.component';

describe('ExpenceTrackerNavbarComponent', () => {
  let component: ExpenceTrackerNavbarComponent;
  let fixture: ComponentFixture<ExpenceTrackerNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenceTrackerNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenceTrackerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
