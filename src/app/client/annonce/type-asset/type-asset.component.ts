import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Annonce } from 'src/app/shared/models/annonce.model';
import { DataService } from 'src/app/shared/services/data.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-type-asset',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './type-asset.component.html',
  styleUrls: ['./type-asset.component.scss'],
})
export class TypeAssetComponent implements OnInit, OnChanges {
  @Input() isEdit = false;
  @Input() annonce!: Annonce;
  assetTypeForm = new FormGroup({
    typeBien: new FormControl('', Validators.required),
  });

  types: string[] = [];

  constructor(private _dataService: DataService) {}

  ngOnChanges(): void {
    if (this.isEdit) {
      this.patchForm();
    }
  }

  patchForm() {
    this.assetTypeForm.patchValue({ typeBien: this.annonce.typeBien });
  }

  ngOnInit(): void {
    this._dataService.getAssetTypes().subscribe((types) => {
      this.types = types;
    });
  }

  getValue() {
    if (this.assetTypeForm.invalid) {
      this.assetTypeForm.markAllAsTouched();
      return null;
    }

    return this.assetTypeForm.value;
  }
}
