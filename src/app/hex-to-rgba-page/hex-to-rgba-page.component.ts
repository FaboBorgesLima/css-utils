import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Color } from '../color/color';
import { ColorSelectorComponent } from '../color-selector/color-selector.component';

@Component({
  selector: 'app-hex-to-rgba-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ColorSelectorComponent],
  templateUrl: './hex-to-rgba-page.component.html',
  styleUrl: './hex-to-rgba-page.component.css',
})
export class HexToRgbaPageComponent {
  public color: Color = new Color(255, 255, 255);

  public hex = '#fff';
}
