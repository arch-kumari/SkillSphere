import { TestBed } from '@angular/core/testing';

import { RegisterclassService } from './registerclass.service';

describe('RegisterclassService', () => {
  let service: RegisterclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
