import { Injectable } from '@angular/core';
import { Color } from '../color/color';

@Injectable({
  providedIn: 'root',
})
export class SmoothLinearGradientCalculatorService {
  private steps: number = 2;
  public startColor: Color = new Color(0, 0, 0);
  public endColor: Color = new Color(0, 0, 0);
  private deg: number = 90;

  setSteps(steps: number): void {
    this.steps = steps;
  }

  setDeg(deg: number): void {
    this.deg = Math.trunc(deg);
  }

  private calculateSingleColorN(start: number, end: number): number[] {
    const colors: number[] = [];

    const middle = (start + end) / 2;
    const sqrtMiddle = Math.sqrt(middle);
    const halfSteps = Math.trunc(this.steps / 2) + 1;
    const isOddSteps = Boolean(this.steps % 2);

    for (let i = 1; i <= halfSteps; i++) {
      colors.push();
    }

    if (isOddSteps) colors.push(middle);

    for (let i = 1; i <= halfSteps; i++) {
      colors.push();
    }

    console.log('start: ', start, ', end:', end, ', steps', colors);

    return colors;
  }

  calculateColors(): Color[] {
    const colors: Color[] = [];

    const r = this.calculateSingleColorN(
      this.startColor.getR(),
      this.endColor.getR()
    );
    const g = this.calculateSingleColorN(
      this.startColor.getG(),
      this.endColor.getG()
    );
    const b = this.calculateSingleColorN(
      this.startColor.getB(),
      this.endColor.getB()
    );
    const a = this.calculateSingleColorN(
      this.startColor.getA(),
      this.endColor.getA()
    );

    for (let i = 0; i < r.length; i++) {
      colors.push(new Color(r[i], g[i], b[i], a[i]));
    }

    return colors;
  }

  calculatePoints(): number[] {
    const points: number[] = [];

    for (let i = 0; i < this.steps; i++) {
      points.push(i * (1 / this.steps));
    }
    points.push(1);

    return points;
  }
  toLinearGradient(rgba: boolean = true): string {
    if (rgba)
      return `linear-gradient(${
        this.deg
      }deg, ${this.startColor.toRGBA()} 0%, ${this.endColor.toRGBA()} 100%)`;

    return `linear-gradient(${
      this.deg
    }deg, ${this.startColor.toHex()} 0%, ${this.endColor.toHex()} 100%)`;
  }

  toSmoothLinearGradient(rgba: boolean = true): string {
    const colors = this.calculateColors();
    const points = this.calculatePoints();

    let linearGradient = `linear-gradient(${this.deg}deg, `;

    for (let i = 0; i < colors.length - 1; i++) {
      linearGradient += `${rgba ? colors[i].toRGBA() : colors[i].toHex()} ${
        points[i] * 100
      }%,`;
    }

    linearGradient += `${colors[colors.length - 1].toRGBA()} ${
      points[colors.length - 1] * 100
    }% )`;

    return linearGradient;
  }
}
