import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothLinearGradientComponent } from './smooth-linear-gradient.component';

describe('SmoothLinearGradientComponent', () => {
  let component: SmoothLinearGradientComponent;
  let fixture: ComponentFixture<SmoothLinearGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmoothLinearGradientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmoothLinearGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
