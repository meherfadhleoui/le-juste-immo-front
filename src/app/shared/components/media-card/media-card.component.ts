import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PIcon } from '../../enums/icons.enum';

@Component({
  selector: 'app-media-card',
  templateUrl: './media-card.component.html',
  styleUrls: ['./media-card.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MediaCardComponent),
      multi: true,
    },
  ],
})
export class MediaCardComponent implements ControlValueAccessor {
  value: any = false;
  @Input() name = '';
  @Input() isNumber: boolean | undefined = false;
  number = 0;
  PIcon = PIcon;

  onChange(value: any): void {}
  onTouched(): void {}

  writeValue(value: any): void {
    this.value = this.isNumber ? !!value : value;
    this.number = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleState() {
    this.value = !this.value;
    this.onTouched();

    if (!this.isNumber) {
      this.onChange(this.value);
      return;
    }

    this.number = 0;
    this.onChange(this.number);
  }

  onNumberChange() {
    this.onChange(this.number);
  }
}
