import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaSigninSilentComponent } from './spa-signin-silent.component';

describe('SpaSigninSilentComponent', () => {
  let component: SpaSigninSilentComponent;
  let fixture: ComponentFixture<SpaSigninSilentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaSigninSilentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaSigninSilentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
