import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionCopy } from '@ng-icons/ionicons';

@Component({
  selector: 'app-code-card',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './code-card.component.html',
  styleUrl: './code-card.component.css',
  viewProviders: [provideIcons({ ionCopy })],
})
export class CodeCardComponent {
  @Input({ required: true }) code!: string;
  @Input({ required: true }) header!: string;

  public copyToClipBoard(str: string | null = ''): void {
    navigator.clipboard.writeText(str ? str : '');
  }
}
