import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskFactorsComponent } from './risk-factors.component';

describe('RiskFactorsComponent', () => {
  let component: RiskFactorsComponent;
  let fixture: ComponentFixture<RiskFactorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskFactorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskFactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
