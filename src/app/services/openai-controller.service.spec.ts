import { TestBed } from '@angular/core/testing';

import { OpenaiControllerService } from './openai-controller.service';

describe('OpenaiControllerService', () => {
  let service: OpenaiControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenaiControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
