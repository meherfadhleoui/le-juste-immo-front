import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @Input() activeIndex = 0;
  @Input() items: MenuItem[] = [];

  @Output() onStepItemClick = new EventEmitter<number>();

  click(index: number) {
    this.onStepItemClick.emit(index);
  }
}
