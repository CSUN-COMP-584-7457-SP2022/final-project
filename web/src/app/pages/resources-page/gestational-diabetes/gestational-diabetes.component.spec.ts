import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestationalDiabetesComponent } from './gestational-diabetes.component';

describe('GestationalDiabetesComponent', () => {
  let component: GestationalDiabetesComponent;
  let fixture: ComponentFixture<GestationalDiabetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestationalDiabetesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestationalDiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
