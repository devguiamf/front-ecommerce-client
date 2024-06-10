import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  @Input() message!: string;
  @Input() size: SpinnerSize = 'medium';
  defaultMessage = 'Carregando...';

  get spinnerSize(): string {
    switch (this.size) {
      case 'small':
        return 'spinner-small';
      case 'large':
        return 'spinner-large';
      default:
        return 'spinner-medium';
    }
  }

}

export type SpinnerSize = 'small' | 'medium' | 'large';

