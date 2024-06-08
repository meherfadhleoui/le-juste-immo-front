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
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollService } from 'src/app/shared/services/scroll.service';
import { GeneralInformationsComponent } from './general-informations/general-informations.component';
import { BilanEnergitiqueComponent } from './bilan-energitique/bilan-energitique.component';
import { ContactComponent } from './contact/contact.component';
import { UserService } from 'src/app/core/auth/user.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { User } from 'src/app/shared/models/user.models';

interface ValueGetter {
  getValue(): any;
}

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss'],
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
  user!: User;
  isEdit = false;

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
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.isEdit = this.activatedRoute.snapshot.data['isEdit'];

    if (this.isEdit) {
      this.getAnnonce();
    }

    this.getUser();
    this.initStepsItems();
    this.initStepData();
  }

  getAnnonce() {
    const annonceId = this.activatedRoute.snapshot.params['id'];

    this._annonceService.getById(annonceId).subscribe({
      next: (annonce) => {
        this.annonce = annonce;
      },
      error: () => {
        this.router.navigate(['/home']);
      },
    });
  }

  getUser() {
    this._userService.user$.subscribe((user) => {
      this.user = user;
    });
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
        label: 'Vous avez un bien pour ... *',
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
        header: `Quel est le prix de votre appartement ?`,
        label: 'Prix *',
        component: this.priceComponent,
      },
    ];
  }

  next() {
    if (!this.getCurrentStepValue()) {
      return;
    }

    if (this.isLastStep()) {
      this.submit();
      return;
    }

    this._scrollService.scrollToTop();
    this.activeIndex++;
  }

  back(index = this.activeIndex - 1) {
    if (!this.getCurrentStepValue()) {
      return;
    }

    this.activeIndex = index;
  }

  onStepItemClick(stepIndex: number) {
    if (stepIndex < this.activeIndex) {
      this.back(stepIndex);
      return;
    }

    const stepsDataCopy = this.stepsData.slice();

    const invalidComponent = stepsDataCopy
      .splice(0, stepIndex)
      .some((step) => !step.component.getValue());

    if (invalidComponent) {
      this._toastService.error(
        'Veuillez vérifier les informations que vous avez fournies.',
      );
      return;
    }

    this.getCurrentStepValue();
    this.activeIndex = stepIndex;
  }

  getCurrentStepValue(): boolean {
    const currentStepValue =
      this.stepsData[this.activeIndex].component.getValue();

    if (!currentStepValue) {
      this._toastService.error(
        'Veuillez vérifier les informations que vous avez fournies.',
      );
      return false;
    }

    this.annonce = { ...this.annonce, ...currentStepValue };
    this.checkPriceHeader();
    return true;
  }

  isLastStep() {
    return this.activeIndex === this.stepsData.length - 1;
  }

  checkPriceHeader() {
    const typeBien = (this.annonce.typeBien as string) || '';
    this.stepsData[this.stepsData.length - 1].header =
      `Quel est le prix de votre ${typeBien.toLocaleLowerCase()} ?`;
  }

  submit() {
    this.isLoading = true;
    const annonce = new FormData();

    appendObjectToFormData(annonce, this.annonce);

    if (this.isEdit) {
      return this.updateAnnonce(annonce);
    }

    this.createAnnonce(annonce);
  }

  createAnnonce(annonce: FormData) {
    for (let image of this.annonce.images) {
      annonce.append('images', image);
    }

    annonce.append('mainImage', this.annonce.mainImage);
    annonce.append('annonceur', this.user._id);

    this._annonceService.create(annonce).subscribe({
      next: (res) => {
        this.router.navigate(['/profile/mes-annonces']);
        this._toastService.success(res.message);
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  updateAnnonce(annonce: FormData) {
    if (this.annonce.mainImage) {
      annonce.append('mainImage', this.annonce.mainImage);
    }

    if (this.annonce.images?.length) {
      for (let image of this.annonce.images) {
        annonce.append('images', image);
      }
    }

    this._annonceService.update(this.annonce._id, annonce).subscribe({
      next: (res) => {
        this._toastService.success(res.message);
        this.router.navigate([`annonce/${this.annonce._id}`]);
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
