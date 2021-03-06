import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DownloadHandlerComponent } from './download-handler.component';

describe('DownloadHandlerComponent', () => {
  let component: DownloadHandlerComponent;
  let fixture: ComponentFixture<DownloadHandlerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
