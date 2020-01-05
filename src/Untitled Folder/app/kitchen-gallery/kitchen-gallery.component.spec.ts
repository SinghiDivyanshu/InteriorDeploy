import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenGalleryComponent } from './kitchen-gallery.component';

describe('KitchenGalleryComponent', () => {
  let component: KitchenGalleryComponent;
  let fixture: ComponentFixture<KitchenGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
