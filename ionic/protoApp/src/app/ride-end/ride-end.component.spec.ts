import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideEndComponent } from './ride-end.component';

describe('RideEndComponent', () => {
  let component: RideEndComponent;
  let fixture: ComponentFixture<RideEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideEndComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
