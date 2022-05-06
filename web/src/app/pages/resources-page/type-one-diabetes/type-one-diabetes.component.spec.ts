import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOneDiabetesComponent } from './type-one-diabetes.component';

describe('TypeOneDiabetesComponent', () => {
  let component: TypeOneDiabetesComponent;
  let fixture: ComponentFixture<TypeOneDiabetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOneDiabetesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOneDiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
