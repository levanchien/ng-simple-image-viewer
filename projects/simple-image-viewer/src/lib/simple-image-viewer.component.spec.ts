import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleImageViewerComponent } from './simple-image-viewer.component';

describe('SimpleImageViewerComponent', () => {
  let component: SimpleImageViewerComponent;
  let fixture: ComponentFixture<SimpleImageViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleImageViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleImageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
