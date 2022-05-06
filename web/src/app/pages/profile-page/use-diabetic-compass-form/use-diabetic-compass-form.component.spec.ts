import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseDiabeticCompassFormComponent } from './use-diabetic-compass-form.component';

describe('UseDiabeticCompassFormComponent', () => {
  let component: UseDiabeticCompassFormComponent;
  let fixture: ComponentFixture<UseDiabeticCompassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseDiabeticCompassFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseDiabeticCompassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
