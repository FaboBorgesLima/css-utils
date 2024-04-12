import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothLinearGradientPageComponent } from './smooth-linear-gradient-page.component';

describe('SmoothLinearGradientComponent', () => {
  let component: SmoothLinearGradientPageComponent;
  let fixture: ComponentFixture<SmoothLinearGradientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmoothLinearGradientPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmoothLinearGradientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
