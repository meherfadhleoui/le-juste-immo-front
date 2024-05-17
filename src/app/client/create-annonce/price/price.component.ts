import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent {
  priceForm = new FormGroup({
    montant: new FormControl(null, Validators.required),
    tva: new FormControl(null, Validators.required),
  });

  getValue() {
    if (this.priceForm.invalid) {
      this.priceForm.markAllAsTouched();
      return null;
    }

    return { prix: this.priceForm.value };
  }
}
