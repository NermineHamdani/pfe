import { TestBed } from '@angular/core/testing';

import { Documentation } from './documentation';

describe('Documentation', () => {
  let service: Documentation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Documentation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
