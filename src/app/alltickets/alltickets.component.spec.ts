import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllticketsComponent } from './alltickets.component';

describe('AllticketsComponent', () => {
  let component: AllticketsComponent;
  let fixture: ComponentFixture<AllticketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllticketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
