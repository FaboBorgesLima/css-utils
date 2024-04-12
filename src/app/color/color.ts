export class Color {
  private r = 0;
  private g = 0;
  private b = 0;
  private a = 255;

  /**
   *
   * @param r
   * @param g
   * @param b
   * @param a
   */
  constructor(r: number, g: number, b: number, a: number = 255) {
    this.setR(r);
    this.setG(g);
    this.setB(b);
    this.setA(a);
  }

  setR(r: number) {
    this.r = this.between0and255(r);
  }

  setG(g: number) {
    this.g = this.between0and255(g);
  }
  setB(b: number) {
    this.b = this.between0and255(b);
  }
  setA(a: number) {
    this.a = this.between0and255(a);
  }

  private between0and255(n: number): number {
    return Math.min(Math.max(Math.trunc(n), 0), 255);
  }

  fromRGBAorRGB(color: string = ''): void {
    const colors = this.splitRGBAorRGBinColors(color);

    if (colors.length >= 3) {
      const r = parseInt(colors[0]);
      const g = parseInt(colors[1]);
      const b = parseInt(colors[2]);
      this.setR(r);
      this.setG(g);
      this.setB(b);
    }

    if (colors.length >= 4) {
      const a = parseFloat(colors[3]) * 255;
      this.setA(a);
    }
  }

  private splitRGBAorRGBinColors(color: string): string[] {
    const filtered = color.replaceAll(/[^0-9\.\,]/g, '');
    const parts = filtered.split(',');
    return parts;
  }

  fromHex(color: string): boolean {
    const clearColor = color
      .toLocaleUpperCase()
      .replaceAll(/[^ABCDEF0-9]/g, '');

    if (clearColor.length < 2) return false;

    switch (clearColor.length) {
      case 3:
        this.r = parseInt(clearColor[0] + clearColor[0], 16);
        this.g = parseInt(clearColor[1] + clearColor[1], 16);
        this.b = parseInt(clearColor[2] + clearColor[2], 16);
        this.a = 255;
        return true;
      case 6:
        this.r = parseInt(clearColor[0] + clearColor[1], 16);
        this.g = parseInt(clearColor[2] + clearColor[3], 16);
        this.b = parseInt(clearColor[4] + clearColor[5], 16);
        this.a = 255;
        return true;
      case 4:
        this.r = parseInt(clearColor[0] + clearColor[0], 16);
        this.g = parseInt(clearColor[1] + clearColor[1], 16);
        this.b = parseInt(clearColor[2] + clearColor[2], 16);
        this.a = parseInt(clearColor[3] + clearColor[3], 16);
        return true;
      case 8:
        this.r = parseInt(clearColor[0] + clearColor[1], 16);
        this.g = parseInt(clearColor[2] + clearColor[3], 16);
        this.b = parseInt(clearColor[4] + clearColor[5], 16);
        this.a = parseInt(clearColor[6] + clearColor[7], 16);
        return true;
    }
    return false;
  }
  getR(): number {
    return this.r;
  }
  getG(): number {
    return this.g;
  }
  getB(): number {
    return this.b;
  }
  getA(): number {
    return this.a;
  }
  toHex(): string {
    if (this.a == 255)
      return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(
        16
      )}`;

    return `${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(
      16
    )}${this.a.toString(16)}`;
  }
  toRGBAorRGB(): string {
    if (this.a == 255) return `rgb(${this.r},${this.g},${this.b})`;

    return `rgba(${this.r},${this.g},${this.b},${this.a / 255})`;
  }
}
