import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HREmployeeComponent } from './hr-employee.component';

describe('HREmployeeComponent', () => {
  let component: HREmployeeComponent;
  let fixture: ComponentFixture<HREmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HREmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HREmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
