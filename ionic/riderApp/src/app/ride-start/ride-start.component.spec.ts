import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideStartComponent } from './ride-start.component';

describe('RideStartComponent', () => {
  let component: RideStartComponent;
  let fixture: ComponentFixture<RideStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideStartComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
