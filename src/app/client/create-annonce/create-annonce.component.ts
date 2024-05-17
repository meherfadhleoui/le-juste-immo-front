import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressComponent } from './address/address.component';
import { TypeAssetComponent } from './type-asset/type-asset.component';
import { CharacteristicsComponent } from './characteristics/characteristics.component';
import { OfferComponent } from './offer/offer.component';
import { PicturesComponent } from './pictures/pictures.component';
import { PriceComponent } from './price/price.component';
import { AnnonceService } from 'src/app/shared/services/annonce.service';
import { appendObjectToFormData } from 'src/app/shared/utils/utils';
import { Router } from '@angular/router';
import { ScrollService } from 'src/app/shared/services/scroll.service';
import { GeneralInformationsComponent } from './general-informations/general-informations.component';
import { BilanEnergitiqueComponent } from './bilan-energitique/bilan-energitique.component';
import { ContactComponent } from './contact/contact.component';
import { UserService } from 'src/app/core/auth/user.service';
import { switchMap, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';

interface ValueGetter {
  getValue(): any;
}

@Component({
  selector: 'app-create-annonce',
  templateUrl: './create-annonce.component.html',
  styleUrls: ['./create-annonce.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    AddressComponent,
    TypeAssetComponent,
    CharacteristicsComponent,
    OfferComponent,
    PicturesComponent,
    PriceComponent,
    GeneralInformationsComponent,
    BilanEnergitiqueComponent,
    ContactComponent,
  ],
})
export class CreateAnnonceComponent implements OnInit {
  annonce: any = {};
  activeIndex: number = 0;
  items!: MenuItem[];
  stepsData!: { header: string; label: string; component: ValueGetter }[];

  @ViewChild(OfferComponent, { static: true })
  offerComponent!: OfferComponent;

  @ViewChild(TypeAssetComponent, { static: true })
  typeAssetComponent!: TypeAssetComponent;

  @ViewChild(GeneralInformationsComponent, { static: true })
  generalInformationsComponent!: GeneralInformationsComponent;

  @ViewChild(AddressComponent, { static: true })
  addressComponent!: AddressComponent;

  @ViewChild(ContactComponent, { static: true })
  contactComponent!: ContactComponent;

  @ViewChild(CharacteristicsComponent, { static: true })
  characteristicsComponent!: CharacteristicsComponent;

  @ViewChild(BilanEnergitiqueComponent, { static: true })
  bilanEnergitiqueComponent!: BilanEnergitiqueComponent;

  @ViewChild(PicturesComponent, { static: true })
  picturesComponent!: PicturesComponent;

  @ViewChild(PriceComponent, { static: true })
  priceComponent!: PriceComponent;

  isLoading = false;

  constructor(
    private _annonceService: AnnonceService,
    private router: Router,
    private _scrollService: ScrollService,
    private _userService: UserService,
    private _toastService: ToastService,
  ) {}

  ngOnInit() {
    this.initStepsItems();
    this.initStepData();
  }

  initStepsItems() {
    this.items = [
      { label: "Type de l'offre" },
      { label: 'Type du bien' },
      { label: 'Description du bien' },
      { label: 'Adresse' },
      { label: 'Contact' },
      { label: 'Caractéristique' },
      { label: 'Bilan énergétique' },
      { label: 'Photos' },
      { label: 'Prix du bien' },
    ];
  }

  initStepData() {
    this.stepsData = [
      {
        header: 'Quel est votre offre ?',
        label: 'Vous avez un bien ... *',
        component: this.offerComponent,
      },
      {
        header: 'Quel bien louez-vous ?',
        label: 'Type de bien *',
        component: this.typeAssetComponent,
      },
      {
        header: 'Description de votre bien',
        label: '',
        component: this.generalInformationsComponent,
      },
      {
        header: 'Où se trouve votre appartement ?',
        label: 'Localisation',
        component: this.addressComponent,
      },
      {
        header: 'Comment pouvons-nous vous contacter? ?',
        label: 'Contact',
        component: this.contactComponent,
      },
      {
        header:
          'Précisez les caractéristiques principales de votre appartement',
        label: 'Informations clés',
        component: this.characteristicsComponent,
      },
      {
        header:
          'Indiquez les résultats de votre diagnostic de performance énergétique (DPE)',
        label: 'Avez-vous les résultats de votre DPE ? *',
        component: this.bilanEnergitiqueComponent,
      },
      {
        header: 'Ajoutez des photos de votre appartement',
        label: 'Vos photos',
        component: this.picturesComponent,
      },

      {
        header: `A quel prix louez-vous votre appartement ?`,
        label: 'Prix *',
        component: this.priceComponent,
      },
    ];
  }

  next() {
    const currentStepValue = this.getCurrentStepValue();

    if (!currentStepValue) {
      this._toastService.error(
        'Veuillez vérifier les informations que vous avez fournies.',
      );
      return;
    }

    this.annonce = { ...this.annonce, ...currentStepValue };
    this.checkPriceHeader();

    if (this.isLastStep()) {
      this.submit();
      return;
    }

    this._scrollService.scrollToTop();
    this.activeIndex++;
  }

  getCurrentStepValue() {
    return this.stepsData[this.activeIndex].component.getValue();
  }

  isLastStep() {
    return this.activeIndex === this.stepsData.length - 1;
  }

  back() {
    this.activeIndex--;
  }

  checkPriceHeader() {
    const label = this.annonce.typeOffre === 'Vente' ? 'vendez' : 'louez';
    this.stepsData[this.stepsData.length - 1].header =
      `A quel prix ${label}-vous votre appartement ?`;
  }

  submit() {
    this.isLoading = true;
    const annonce = new FormData();

    appendObjectToFormData(annonce, this.annonce);

    for (let image of this.annonce.images) {
      annonce.append('images', image);
    }

    annonce.append('mainImage', this.annonce.mainImage);

    this._userService.user$
      .pipe(
        switchMap((user) => {
          annonce.append('annonceur', user._id);
          return this.createAnnonce(annonce);
        }),
      )
      .subscribe();
  }

  createAnnonce(annonce: FormData) {
    return this._annonceService.create(annonce).pipe(
      tap({
        next: (res) => {
          this.router.navigate(['/profile/mes-annonces']);
          this._toastService.success(res.message);
        },
        error: () => {
          this.isLoading = false;
        },
      }),
    );
  }
}
