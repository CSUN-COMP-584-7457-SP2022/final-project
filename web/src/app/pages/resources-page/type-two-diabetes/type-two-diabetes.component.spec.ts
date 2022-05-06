import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTwoDiabetesComponent } from './type-two-diabetes.component';

describe('TypeTwoDiabetesComponent', () => {
  let component: TypeTwoDiabetesComponent;
  let fixture: ComponentFixture<TypeTwoDiabetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeTwoDiabetesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeTwoDiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
