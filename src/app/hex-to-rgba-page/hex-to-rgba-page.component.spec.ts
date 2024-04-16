import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HexToRgbaPageComponent } from './hex-to-rgba-page.component';

describe('HexToRgbaPageComponent', () => {
  let component: HexToRgbaPageComponent;
  let fixture: ComponentFixture<HexToRgbaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HexToRgbaPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HexToRgbaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
