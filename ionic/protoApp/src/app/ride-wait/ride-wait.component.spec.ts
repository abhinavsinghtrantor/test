import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideWaitComponent } from './ride-wait.component';

describe('RideWaitComponent', () => {
  let component: RideWaitComponent;
  let fixture: ComponentFixture<RideWaitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideWaitComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideWaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
