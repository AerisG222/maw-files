import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileThumbnailComponent } from './file-thumbnail.component';

describe('FileThumbnailComponent', () => {
  let component: FileThumbnailComponent;
  let fixture: ComponentFixture<FileThumbnailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
