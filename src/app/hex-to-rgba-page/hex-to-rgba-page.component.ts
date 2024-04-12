import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Color } from '../color/color';

@Component({
  selector: 'app-hex-to-rgba-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './hex-to-rgba-page.component.html',
  styleUrl: './hex-to-rgba-page.component.css',
})
export class HexToRgbaPageComponent {
  public color: Color = new Color(255, 255, 255);

  public hex = new FormControl(this.color.toHex());

  public rgba = new FormControl(this.color.toRGBAorRGB());

  updateRGBA(): string {
    this.color.fromHex(this.hex.value ? this.hex.value : '');
    this.rgba.setValue(this.color.toRGBAorRGB());

    return this.color.toRGBAorRGB();
  }
  updateHex(): string {
    this.color.fromRGBAorRGB(this.rgba.value ? this.rgba.value : '');
    this.hex.setValue(this.color.toHex());

    return this.color.toHex();
  }
}
