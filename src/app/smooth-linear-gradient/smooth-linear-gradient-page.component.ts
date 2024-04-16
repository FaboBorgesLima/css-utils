import { Component, Inject } from '@angular/core';
import { SmoothLinearGradientCalculatorService } from '../smooth-linear-gradient-calculator/smooth-linear-gradient-calculator.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionColorPalette, ionCopy } from '@ng-icons/ionicons';
import { Color } from '../color/color';
import { NgStyle } from '@angular/common';
import { CodeCardComponent } from '../code-card/code-card.component';
import { ColorSelectorComponent } from '../color-selector/color-selector.component';

@Component({
  selector: 'app-smooth-linear-gradient',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIconComponent,
    NgStyle,
    CodeCardComponent,
    ColorSelectorComponent,
  ],
  templateUrl: './smooth-linear-gradient-page.component.html',
  styleUrl: './smooth-linear-gradient-page.component.css',
  viewProviders: [provideIcons({ ionColorPalette, ionCopy })],
})
export class SmoothLinearGradientPageComponent {
  public startHex = '#fff';
  public endHex = '#000';
  public startColor: Color = new Color(255, 255, 255);
  public endColor: Color = new Color(0, 0, 0);
  public linearGradient: string = '';
  public smoothLinearGradient: boolean = false;

  constructor(public calculator: SmoothLinearGradientCalculatorService) {
    calculator.setSteps(13);
    calculator.endColor = this.endColor;
    calculator.startColor = this.startColor;
    this.linearGradient = this.updateLinearGradient();
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

  public calculateLinearGrandient(startHex: string, endHex: string): string {
    this.calculator.startColor.fromHex(startHex);
    this.calculator.endColor.fromHex(endHex);

    if (this.smoothLinearGradient)
      return this.calculator.toSmoothLinearGradient();
    return this.calculator.toLinearGradient();
  }

  public updateLinearGradient(): string {
    let linear = this.calculator.toLinearGradient();

    if (this.smoothLinearGradient)
      linear = this.calculator.toSmoothLinearGradient();

    this.linearGradient = linear;
    return linear;
  }
}
