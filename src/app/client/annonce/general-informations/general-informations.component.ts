import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { Annonce } from 'src/app/shared/models/annonce.model';

@Component({
  selector: 'app-general-informations',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './general-informations.component.html',
  styleUrls: ['./general-informations.component.scss'],
})
export class GeneralInformationsComponent implements OnInit, OnChanges {
  @Input() isEdit = false;
  @Input() annonce!: Annonce;
  form = new FormGroup({
    titre: new FormControl('', Validators.required),
    etat: new FormControl('', Validators.required),
    descriptionDetaillee: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  etats: string[] = [];

  constructor(private _dataService: DataService) {}

  ngOnChanges(): void {
    if (this.isEdit) {
      this.patchForm();
    }
  }

  patchForm() {
    this.form.patchValue({
      titre: this.annonce.titre,
      etat: this.annonce.etat,
      descriptionDetaillee: this.annonce.descriptionDetaillee,
    });
  }

  ngOnInit(): void {
    this._dataService.getEtats().subscribe((etats) => {
      this.etats = etats;
    });
  }

  getValue() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return null;
    }

    return this.form.value;
  }
}
