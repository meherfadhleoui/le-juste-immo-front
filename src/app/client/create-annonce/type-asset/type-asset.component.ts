import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-type-asset',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './type-asset.component.html',
  styleUrls: ['./type-asset.component.scss'],
})
export class TypeAssetComponent {
  selectedType = null;
  assetTypeForm = new FormGroup({
    typeBien: new FormControl('', Validators.required),
  });

  types = ['Hangar', 'Villa', 'Duplex', 'Maison'];

  // To See Later
  enum = [
    'Appartement',
    'Maison ',
    'Terrain',
    'Local',
    'Villa',
    'Studio',
    'Duplex',
    'Hangar',
  ];
  selectRadioButton(value: any) {
    this.selectedType = value;
    this.assetTypeForm.get('typeBien')?.patchValue(value);
  }

  getValue() {
    if (this.assetTypeForm.invalid) {
      this.assetTypeForm.markAllAsTouched();
      return null;
    }

    return this.assetTypeForm.value;
  }
}
