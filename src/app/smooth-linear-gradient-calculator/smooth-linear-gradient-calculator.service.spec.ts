import { TestBed } from '@angular/core/testing';

import { SmoothLinearGradientCalculatorService } from './smooth-linear-gradient-calculator.service';

describe('SmoothLinearGradientCalculatorService', () => {
  let service: SmoothLinearGradientCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmoothLinearGradientCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
