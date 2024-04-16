import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Color } from '../color/color';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionCopy } from '@ng-icons/ionicons';

@Component({
  selector: 'app-color-selector',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIcon],
  templateUrl: './color-selector.component.html',
  styleUrl: './color-selector.component.css',
  viewProviders: [provideIcons({ ionCopy })],
})
export class ColorSelectorComponent {
  @Input({ required: true }) hex!: string;
  @Output() hexChange = new EventEmitter<string>();
  @Input({ required: true }) header!: string;
  hexInput = new FormControl(this.hex);
  rgbInput = new FormControl('');
  color: Color = new Color(0, 0, 0);

  r = new FormControl(0);
  g = new FormControl(0);
  b = new FormControl(0);
  a = new FormControl(0);

  public copyToClipBoard(str: string | null = ''): void {
    navigator.clipboard.writeText(str ? str : '');
  }

  ngOnInit() {
    this.color.fromHex(this.hex);
    this.r.setValue(this.color.getR());
    this.g.setValue(this.color.getG());
    this.b.setValue(this.color.getB());
    this.a.setValue(this.color.getA());
    this.hexInput.setValue(this.color.toHex());
    this.rgbInput.setValue(this.color.toRGBAorRGB());
  }

  updateHex(): void {
    const r = this.r.value ? this.r.value : 0;
    const g = this.g.value ? this.g.value : 0;
    const b = this.b.value ? this.b.value : 0;
    const a = this.a.value ? this.a.value : 0;

    this.color.setR(r);
    this.color.setG(g);
    this.color.setB(b);
    this.color.setA(a);

    const newHex = this.color.toHex();

    this.hexChange.emit(newHex);
    this.hexInput.setValue(newHex);
    this.rgbInput.setValue(this.color.toRGBAorRGB());
  }

  updateHexOnInputHex(): void {
    this.color.fromHex(this.hexInput.value ? this.hexInput.value : '');

    this.r.setValue(this.color.getR());
    this.g.setValue(this.color.getG());
    this.b.setValue(this.color.getB());
    this.a.setValue(this.color.getA());
    this.rgbInput.setValue(this.color.toRGBAorRGB());

    const newHex = this.color.toHex();

    this.hexChange.emit(newHex);
  }

  updateHexOnInputRGBA(): void {
    this.color.fromRGBAorRGB(this.rgbInput.value ? this.rgbInput.value : '');

    this.r.setValue(this.color.getR());
    this.g.setValue(this.color.getG());
    this.b.setValue(this.color.getB());
    this.a.setValue(this.color.getA());
    this.hexInput.setValue(this.color.toHex());

    const newHex = this.color.toHex();

    this.hexChange.emit(newHex);
  }

  getHexWithoutTransparency(): string {
    const colorWithoutTransparency = new Color(
      this.color.getR(),
      this.color.getG(),
      this.color.getB()
    );

    return colorWithoutTransparency.toHex();
  }
}
