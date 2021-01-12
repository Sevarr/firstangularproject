import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAccountDataComponent } from './change-account-data.component';

describe('ChangeAccountDataComponent', () => {
  let component: ChangeAccountDataComponent;
  let fixture: ComponentFixture<ChangeAccountDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAccountDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeAccountDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
