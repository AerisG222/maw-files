import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettingsLinkComponent } from './settings-link.component';

describe('SettingsLinkComponent', () => {
  let component: SettingsLinkComponent;
  let fixture: ComponentFixture<SettingsLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
