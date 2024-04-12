import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {
  ERROR_VERIFICATION_MESSAGE,
  SUCCESS_VERIFICATION_MESSAGE,
} from './verification.messages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-account-verification',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss'],
})
export class AccountVerificationComponent implements OnInit {
  isLoading = true;
  isConfirmed!: boolean;
  header = '';
  countdownValue = 5;

  detroyedRef = inject(DestroyRef);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
  ) {}

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.params['token'];
    this.verifyAccount(token);
  }

  verifyAccount(token: string) {
    this._authService
      .verifyAccount(token)
      .pipe(takeUntilDestroyed(this.detroyedRef))
      .subscribe({
        next: () => {
          this.header = SUCCESS_VERIFICATION_MESSAGE;
          this.isConfirmed = true;
          this.startRedirectCountdown();
          this.isLoading = false;
        },
        error: () => {
          this.header = ERROR_VERIFICATION_MESSAGE;
          this.isLoading = false;
          this.isConfirmed = false;
        },
      });
  }

  startRedirectCountdown() {
    const countdownInterval = setInterval(() => {
      if (this.countdownValue > 0) {
        this.countdownValue--;
      } else {
        clearInterval(countdownInterval);
        this.router.navigate(['/login']);
      }
    }, 1000);
  }

  getMessage() {
    if (!this.isConfirmed) {
      return `Veuillez utiliser le lien le plus récent reçu par e-mail 
      ou contacter le support technique pour obtenir de l'aide.`;
    }

    return `Vous serez redirigé(e) vers la page de connexion dans 
    ${this.countdownValue} seconde(s)`;
  }
}
