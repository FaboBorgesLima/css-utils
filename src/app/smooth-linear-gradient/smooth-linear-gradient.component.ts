import { Component, Inject } from '@angular/core';
import { SmoothLinearGradientCalculatorService } from '../smooth-linear-gradient-calculator/smooth-linear-gradient-calculator.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionColorPalette, ionCopy } from '@ng-icons/ionicons';
import { Color } from '../color/color';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-smooth-linear-gradient',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIconComponent, NgStyle],
  templateUrl: './smooth-linear-gradient.component.html',
  styleUrl: './smooth-linear-gradient.component.css',
  viewProviders: [provideIcons({ ionColorPalette, ionCopy })],
})
export class SmoothLinearGradientComponent {
  public startHex = new FormControl('#FFF');
  public endHex = new FormControl('#000');
  public startColor: Color = new Color(255, 255, 255);
  public endColor: Color = new Color(0, 0, 0);
  public linearGradient: string = '';

  constructor(public calculator: SmoothLinearGradientCalculatorService) {
    calculator.setSteps(4);
    calculator.endColor = this.endColor;
    calculator.startColor = this.startColor;
    this.linearGradient = this.calculator.toLinearGradient(90);
  }

  public copyToClipBoard(str: string | null = ''): void {
    navigator.clipboard.writeText(str ? str : '');
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
