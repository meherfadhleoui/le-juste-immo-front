import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DpeState } from 'src/app/shared/enums/dpe-state.enum';
import { GIcon, PIcon } from 'src/app/shared/enums/icons.enum';
import { Annonce } from 'src/app/shared/models/annonce.model';
import { AnnonceService } from 'src/app/shared/services/annonce.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-annonce-viewer',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './annonce-viewer.component.html',
  styleUrls: ['./annonce-viewer.component.scss'],
})
export class AnnonceViewerComponent implements OnInit {
  annonce?: Annonce;
  annonceId = '';
  GIcon = GIcon;
  PIcon = PIcon;
  DpeState = DpeState;

  showImages: boolean = false;

  interieur: { icon: GIcon; value: any; name: string }[] = [];
  exterieur: { icon: GIcon; value: any; name: string }[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _annonceService: AnnonceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.annonceId = this.activatedRoute.snapshot.params['id'];
    this.getAnnonce();
  }

  getAnnonce() {
    this._annonceService.getById(this.annonceId).subscribe({
      next: (annonce) => {
        this.annonce = annonce;
        this.annonce.photos = [annonce.principlePhoto, ...annonce.photos];

        this.initInterieur();
        this.initExterieur();
      },
      error: () => {
        this.router.navigate(['/home']);
      },
    });
  }

  initInterieur() {
    let interieur = {
      Pieces: {
        value: this.annonce?.superficiePieces.pieces,
        icon: GIcon.piece,
      },

      Chambres: {
        value: this.annonce?.superficiePieces.chambres,
        icon: GIcon.chambre,
      },

      'Salles de bain': {
        value: this.annonce?.superficiePieces.sallesDeBain,
        icon: GIcon.sallesDeBain,
      },

      "Salles d'eau": {
        value: this.annonce?.superficiePieces.sallesDeau,
        icon: GIcon.sallesDeau,
      },
    };

    for (let [key, value] of Object.entries(interieur)) {
      if (!value) {
        continue;
      }

      this.interieur.push({
        icon: value.icon,
        value: value.value,
        name: key,
      });
    }
  }

  initExterieur() {
    let exterieur = {
      Garage: {
        value: this.annonce?.superficiePieces.garage,
        icon: GIcon.garage,
      },

      Balcon: {
        value: this.annonce?.superficiePieces.balcon,
        icon: GIcon.balcon,
      },

      Jardin: {
        value: this.annonce?.caracteristiquesSupplementaires.jardin,
        icon: GIcon.jardin,
      },

      Terrasse: {
        value: this.annonce?.caracteristiquesSupplementaires.terrasse,
        icon: GIcon.terrasse,
      },

      Piscine: {
        value: this.annonce?.caracteristiquesSupplementaires.piscine,
        icon: GIcon.piscine,
      },

      Ascenseur: {
        value: this.annonce?.acces.ascenseur,
        icon: GIcon.ascenseur,
      },
    };

    for (let [key, value] of Object.entries(exterieur)) {
      if (!value) {
        continue;
      }

      this.exterieur.push({
        icon: value.icon,
        value: typeof value.value === 'boolean' ? '' : value.value,
        name: key,
      });
    }
  }

  showAllImages() {
    this.showImages = true;
  }
}
