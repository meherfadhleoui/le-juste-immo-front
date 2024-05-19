import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/core/auth/user.service';
import { PIcon } from 'src/app/shared/enums/icons.enum';
import { Annonce } from 'src/app/shared/models/annonce.model';
import { AnnonceService } from 'src/app/shared/services/annonce.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-mes-annonces',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './mes-annonces.component.html',
  styleUrls: ['./mes-annonces.component.scss'],
  providers: [ConfirmationService],
})
export class MesAnnoncesComponent implements OnInit {
  mesAnnoces: Annonce[] = [];
  PIcon = PIcon;

  isLoading = false;

  constructor(
    private _annonceService: AnnonceService,
    private _userService: UserService,
    private confirmationService: ConfirmationService,
    private _toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.getMesAnnonces();
  }

  getMesAnnonces() {
    this._userService.user$
      .pipe(
        switchMap((user) => {
          return this._annonceService.getUserAnnonces(user._id);
        }),
      )
      .subscribe((mesAnnoces) => {
        this.mesAnnoces = mesAnnoces;
      });
  }

  activateAnnonce(event: MouseEvent, id: string, index: number) {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: "Etes-vous sure de vouloir activer l'annonce ?",
      ...this.comfirmProperties(),
      accept: () => {
        this.isLoading = true;

        this._annonceService.activate(id).subscribe({
          next: () => {
            this.mesAnnoces[index].activated = true;
            this.isLoading = false;
            this._toastService.success('Votre annonce a été bien activé');
          },
          error: () => {
            this.isLoading = false;
          },
        });
      },
    });
  }

  desactivateAnnonce(event: MouseEvent, id: string, index: number) {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: "Etes-vous sure de vouloir désactiver l'annonce ?",
      ...this.comfirmProperties(),
      accept: () => {
        this.isLoading = true;

        this._annonceService.desactivate(id).subscribe({
          next: () => {
            this.mesAnnoces[index].activated = false;
            this.isLoading = false;
            this._toastService.success('Votre annonce a été bien désactivé');
          },
          error: () => {
            this.isLoading = false;
          },
        });
      },
    });
  }

  deleteAnnonce(event: MouseEvent, id: string, index: number) {
    event.stopPropagation();
    this.confirmationService.confirm({
      message: 'Etes-vous sure de vouloir supprimer ?',
      ...this.comfirmProperties(),
      accept: () => {
        this.isLoading = true;
        this._annonceService.delete(id).subscribe({
          next: () => {
            this.mesAnnoces.splice(index, 1);
            this.isLoading = false;
            this._toastService.success('Votre annonce a été bien supprimé');
          },
          error: () => {
            this.isLoading = false;
          },
        });
      },
    });
  }

  editAnnonce(event: MouseEvent, id: string, index: number) {
    event.stopPropagation();
  }

  comfirmProperties() {
    return {
      header: 'Confirmation',
      icon: PIcon.warn,
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
    };
  }
}
