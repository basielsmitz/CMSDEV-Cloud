import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SleeptrackerComponent } from './sleeptracker.component';

describe('SleeptrackerComponent', () => {
  let component: SleeptrackerComponent;
  let fixture: ComponentFixture<SleeptrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SleeptrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SleeptrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
