import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Color } from '../color/color';

@Component({
  selector: 'app-color-selector',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.css',
})
export class ColorSelectorComponent {
  readonly RGB_SELECTOR_RANGE = 255 * 5;
  readonly DARKEN_SELECTOR_RANGE = 255 * 2;
  readonly OPACITY_SELECTOR_RANGE = 255;
  rgbSelector = new FormControl(this.RGB_SELECTOR_RANGE / 2);
  darkenSelector = new FormControl(this.DARKEN_SELECTOR_RANGE / 2);
  opacitySelector = new FormControl(this.OPACITY_SELECTOR_RANGE);

  hexRGB = this.selectorRangeToColor(
    this.rgbSelector.value ? this.rgbSelector.value : 0
  ).toHex();
  hexDarken = this.selectorRangeToColor(
    this.rgbSelector.value ? this.rgbSelector.value : 0
  ).toHex();
  hex = this.hexDarken;

  selectorRangeToColor(range: number): Color {
    if (range < 0 || range > this.RGB_SELECTOR_RANGE) return new Color(0, 0, 0);

    let r = 0;
    let g = 0;
    let b = 0;

    let rangeRemainder = range % 255;
    if (rangeRemainder == 0) rangeRemainder;

    if (range < 255) {
      g = rangeRemainder;
      r = 255;
    } else if (range >= 255 && range < 255 * 2) {
      r = 255 - rangeRemainder;
      g = 255;
    } else if (range >= 255 * 2 && range < 255 * 3) {
      g = 255;
      b = rangeRemainder;
    } else if (range >= 255 * 3 && range < 255 * 4) {
      b = 255;
      g = 255 - rangeRemainder;
    } else {
      b = 255;
      r = rangeRemainder;
      if (rangeRemainder == 0) r = 255;
    }

    return new Color(r, g, b);
  }

  updateHexRGB(): void {
    const color = this.selectorRangeToColor(
      this.rgbSelector.value ? this.rgbSelector.value : 0
    );

    this.hexRGB = color.toHex();

    this.updateHexDarken();
  }

  updateHexDarken(): void {
    const color = new Color(0, 0, 0);

    color.fromHex(this.hexRGB);

    this.darkenFromSelector(
      color,
      this.darkenSelector.value ? this.darkenSelector.value : 0
    );

    this.hexDarken = color.toHex();

    this.updateHexOpacity();
  }

  updateHexOpacity(): void {
    const color = new Color(0, 0, 0);

    color.fromHex(this.hexDarken);

    this.opacityFromSelector(
      color,
      this.opacitySelector.value ? this.opacitySelector.value : 0
    );

    this.hex = color.toHex();
  }

  darkenFromSelector(color: Color, range: number): Color {
    if (range < 255) {
      const stepR = color.getR() / 255;
      const stepG = color.getG() / 255;
      const stepB = color.getB() / 255;

      color.setR(color.getR() - (color.getR() - range * stepR));
      color.setG(color.getG() - (color.getG() - range * stepG));
      color.setB(color.getB() - (color.getB() - range * stepB));
      return color;
    }

    if (range > 255) {
      const stepR = (255 - color.getR()) / 255;
      const stepG = (255 - color.getG()) / 255;
      const stepB = (255 - color.getB()) / 255;

      color.setR(color.getR() + (range - 255) * stepR);
      color.setG(color.getG() + (range - 255) * stepG);
      color.setB(color.getB() + (range - 255) * stepB);
      return color;
    }

    return color;
  }

  opacityFromSelector(color: Color, range: number): Color {
    color.setA(range);

    return color;
  }
}
