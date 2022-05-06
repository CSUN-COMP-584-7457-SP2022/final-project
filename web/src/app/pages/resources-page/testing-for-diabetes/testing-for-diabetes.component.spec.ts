import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingForDiabetesComponent } from './testing-for-diabetes.component';

describe('TestingForDiabetesComponent', () => {
  let component: TestingForDiabetesComponent;
  let fixture: ComponentFixture<TestingForDiabetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestingForDiabetesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingForDiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
