import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsandtoolsComponent } from './tipsandtools.component';

describe('TipsandtoolsComponent', () => {
  let component: TipsandtoolsComponent;
  let fixture: ComponentFixture<TipsandtoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipsandtoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsandtoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
