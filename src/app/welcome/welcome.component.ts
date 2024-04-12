import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  constructor(private _authService: AuthService) {}

  signOut() {
    this._authService.signOut();
  }
}
