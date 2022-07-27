import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookconferenceComponent } from './bookconference.component';

describe('BookconferenceComponent', () => {
  let component: BookconferenceComponent;
  let fixture: ComponentFixture<BookconferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookconferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookconferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
