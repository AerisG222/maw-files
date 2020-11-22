import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeLinkComponent } from './home-link.component';

describe('HomeLinkComponent', () => {
  let component: HomeLinkComponent;
  let fixture: ComponentFixture<HomeLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
