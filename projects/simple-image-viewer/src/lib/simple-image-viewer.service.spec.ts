import { TestBed } from '@angular/core/testing';

import { SimpleImageViewerService } from './simple-image-viewer.service';

describe('SimpleImageViewerService', () => {
  let service: SimpleImageViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleImageViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
