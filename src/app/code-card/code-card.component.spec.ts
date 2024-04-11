import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeCardComponent } from './code-card.component';

describe('CodeCardComponent', () => {
  let component: CodeCardComponent;
  let fixture: ComponentFixture<CodeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
