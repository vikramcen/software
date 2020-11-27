import { TestBed } from '@angular/core/testing';

import { HttphandlerService } from './httphandler.service';

describe('HttphandlerService', () => {
  let service: HttphandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttphandlerService);
  });  

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
