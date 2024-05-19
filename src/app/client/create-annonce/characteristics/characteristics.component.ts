import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { GIcon, PIcon } from 'src/app/shared/enums/icons.enum';
import { ScrollService } from 'src/app/shared/services/scroll.service';
import { SharedModule } from 'src/app/shared/shared.module';

interface OutdoorSpace {
  formGroupName: string;
  formControlName: string;
  icon: GIcon;
  name: string;
  isNumber?: boolean;
}

@Component({
  selector: 'app-characteristics',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './characteristics.component.html',
  styleUrls: ['./characteristics.component.scss'],
})
export class CharacteristicsComponent implements OnInit {
  characteristicsForm!: FormGroup;
  PIcon = PIcon;

  outdoorSpaces: OutdoorSpace[] = [
    {
      formGroupName: 'superficiePieces',
      formControlName: 'garage',
      icon: GIcon.garage,
      name: 'Garage',
      isNumber: true,
    },
    {
      formGroupName: 'superficiePieces',
      formControlName: 'balcon',
      icon: GIcon.balcon,
      name: 'Balcon',
      isNumber: true,
    },
    {
      formGroupName: 'caracteristiquesSupplementaires',
      formControlName: 'terrasse',
      icon: GIcon.terrasse,
      name: 'Terrasse',
    },
    {
      formGroupName: 'caracteristiquesSupplementaires',
      formControlName: 'piscine',
      icon: GIcon.piscine,
      name: 'Piscine',
    },
    {
      formGroupName: 'caracteristiquesSupplementaires',
      formControlName: 'jardin',
      icon: GIcon.jardin,
      name: 'Jardin',
    },
    {
      formGroupName: 'acces',
      formControlName: 'ascenseur',
      icon: GIcon.ascenseur,
      name: 'Ascenseur',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private _scrollService: ScrollService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.characteristicsForm = this.fb.group({
      superficieTotale: [null, [Validators.required]],
      superficiePieces: this.fb.group({
        pieces: [null, [Validators.required]],
        chambres: [0],
        sallesDeBain: [0],
        sallesDeau: [0],
        balcon: [0],
        garage: [0],
      }),
      caracteristiquesSupplementaires: this.fb.group({
        terrasse: [false],
        jardin: [false],
        meuble: [null, [Validators.required]],
        piscine: [false],
      }),

      acces: this.fb.group({
        numeroEtage: [0],
        nbrTotalEtages: [0],
        ascenseur: [false],
      }),
    });
  }

  onInputNumberChange(
    event: InputNumberInputEvent,
    controlName: string,
    index = 0,
  ) {
    const value = event.value;
    const control = this.characteristicsForm.get(controlName);

    const conditions = [value > control?.value, value < control?.value];
    const condition = conditions[index];

    if (condition) {
      control?.patchValue(value);
    }
  }

  getValue() {
    if (this.characteristicsForm.invalid) {
      this.characteristicsForm.markAllAsTouched();
      this._scrollService.scrollToFirstInvalidElement(this.characteristicsForm);
      return null;
    }

    return this.characteristicsForm.value;
  }
}
