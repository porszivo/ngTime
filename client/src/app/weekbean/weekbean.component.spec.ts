import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekbeanComponent } from './weekbean.component';

describe('WeekbeanComponent', () => {
  let component: WeekbeanComponent;
  let fixture: ComponentFixture<WeekbeanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekbeanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekbeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
