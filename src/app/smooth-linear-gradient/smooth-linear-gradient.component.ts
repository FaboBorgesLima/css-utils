import { Component, Inject } from '@angular/core';
import { SmoothLinearGradientCalculatorService } from '../smooth-linear-gradient-calculator/smooth-linear-gradient-calculator.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionColorPalette } from '@ng-icons/ionicons';
import { Color } from '../color/color';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-smooth-linear-gradient',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIconComponent, NgStyle],
  templateUrl: './smooth-linear-gradient.component.html',
  styleUrl: './smooth-linear-gradient.component.css',
  viewProviders: [provideIcons({ ionColorPalette })],
})
export class SmoothLinearGradientComponent {
  public startHex = new FormControl('');
  public endHex = new FormControl('');
  public startColor: Color = new Color(1, 0, 0, 1);
  public endColor: Color = new Color(0, 0, 0, 1);
  public linearGradient: string = this.calculator.toLinearGradient(90);

  constructor(public calculator: SmoothLinearGradientCalculatorService) {
    calculator.setSteps(4);
    calculator.endColor = this.endColor;
    calculator.startColor = this.startColor;
  }

  public copyToClipBoard(str: string): void {
    navigator.clipboard.writeText(str);
  }

  /**
   *
   * @param str
   * @returns remove non hex chars and set to upper case
   */
  public sanitizeHexColor(str: string | null = ''): string {
    if (!str) return '#';

    return '#' + str.toLocaleUpperCase().replaceAll(/[^ABCDEF0-9]/g, '');
  }

  public updateLinearGradient(): string {
    const linear = this.calculator.toLinearGradient(90);
    this.linearGradient = linear;
    return linear;
  }
}
