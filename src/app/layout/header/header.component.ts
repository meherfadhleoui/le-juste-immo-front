import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/auth/user.service';
import { User } from '../../shared/models/user.models';
import { PIcon } from 'src/app/shared/enums/icons.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuItems: MenuItem[] = [];
  profileMenu: MenuItem[] = [];
  user!: User;
  isAuthenticated!: boolean;
  PIcon = PIcon;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _userService: UserService,
  ) {}

  ngOnInit() {
    this._authService.check().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      this.initMenuItems();
      this.initProfileItems();

      this._userService.user$.subscribe((user) => {
        this.user = user;
      });
    });
  }

  initMenuItems() {
    this.menuItems = [
      {
        label: 'Annonces',
        routerLink: ['/home'],
      },
      {
        label: 'Agences',
        routerLink: ['/agency'],
      },
      {
        label: 'Mes Annonces',
        visible: this.isAuthenticated,
        routerLink: ['/profile/mes-annonces'],
      },
      {
        label: 'Contact',
      },
    ];
  }

  initProfileItems() {
    this.profileMenu = [
      {
        label: 'Profile',
        icon: PIcon.user,
        visible: this.isAuthenticated,
        routerLink: ['/profile'],
      },
      {
        label: 'Déconnexion',
        icon: PIcon.sign_out,
        command: () => {
          this._authService.signOut();
        },
        visible: this.isAuthenticated,
      },
      {
        label: 'Connexion',
        icon: PIcon.sign_in,
        command: () => {
          this.router.navigate(['/login']);
        },
        visible: !this.isAuthenticated,
      },
      {
        label: 'Insription',
        icon: PIcon.user_plus,
        command: () => {
          this.router.navigate(['/register']);
        },
        visible: !this.isAuthenticated,
      },
    ];
  }
}
