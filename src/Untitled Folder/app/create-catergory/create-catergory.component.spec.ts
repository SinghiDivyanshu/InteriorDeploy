import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCatergoryComponent } from './create-catergory.component';

describe('CreateCatergoryComponent', () => {
  let component: CreateCatergoryComponent;
  let fixture: ComponentFixture<CreateCatergoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCatergoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCatergoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
