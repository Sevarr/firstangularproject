import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewEmployeeAccountComponent } from './create-new-employee-account.component';

describe('CreateNewEmployeeAccountComponent', () => {
  let component: CreateNewEmployeeAccountComponent;
  let fixture: ComponentFixture<CreateNewEmployeeAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewEmployeeAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewEmployeeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
