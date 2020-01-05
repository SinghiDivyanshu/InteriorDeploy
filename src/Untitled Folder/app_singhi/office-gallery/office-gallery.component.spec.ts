import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeGalleryComponent } from './office-gallery.component';

describe('OfficeGalleryComponent', () => {
  let component: OfficeGalleryComponent;
  let fixture: ComponentFixture<OfficeGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
