import { Injectable } from '@angular/core';
import { Color } from '../color/color';

@Injectable({
  providedIn: 'root',
})
export class SmoothLinearGradientCalculatorService {
  private steps: number = 2;
  public startColor: Color = new Color(0, 0, 0, 1);
  public endColor: Color = new Color(0, 0, 0, 1);

  setSteps(steps: number): void {
    this.steps = steps;
  }

  calculateSingleColorN(start: number, end: number): number[] {
    const colors: number[] = [];
    const baseMiddle = Math.sqrt((end - start) / 2);

    const stepByColor = baseMiddle / this.steps;

    for (let i = 0; i < this.steps; i++) {
      colors.push(Math.pow(i * stepByColor, 2) + start);
    }
    for (let i = this.steps; i >= 0; i--) {
      colors.push(end - Math.pow(i * stepByColor, 2));
    }

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

    for (let i = 0; i < this.steps * 2; i++) {
      points.push(i * (1 / (this.steps * 2)));
    }
    points.push(1);

    return points;
  }

  toLinearGradient(deg: number): string {
    const colors = this.calculateColors();
    const points = this.calculatePoints();

    let linearGradient = `linear-gradient(${Math.trunc(deg)}deg, `;

    for (let i = 0; i < colors.length; i++) {
      linearGradient += `${colors[i].toRGBA()} ${points[i]}%,`;
    }

    linearGradient += ')';

    return linearGradient;
  }
}
