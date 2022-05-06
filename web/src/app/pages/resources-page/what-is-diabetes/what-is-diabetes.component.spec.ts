import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsDiabetesComponent } from './what-is-diabetes.component';

describe('WhatIsDiabetesComponent', () => {
  let component: WhatIsDiabetesComponent;
  let fixture: ComponentFixture<WhatIsDiabetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatIsDiabetesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatIsDiabetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
