import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessOrderComponent } from './sucess-order.component';

describe('SucessOrderComponent', () => {
  let component: SucessOrderComponent;
  let fixture: ComponentFixture<SucessOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucessOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
