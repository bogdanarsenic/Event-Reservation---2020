import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsellerComponent } from './addseller.component';

describe('AddsellerComponent', () => {
  let component: AddsellerComponent;
  let fixture: ComponentFixture<AddsellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
