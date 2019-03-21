import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaSigninComponent } from './spa-signin.component';

describe('SigninComponent', () => {
  let component: SpaSigninComponent;
  let fixture: ComponentFixture<SpaSigninComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaSigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
