import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/auth/user.service';
import { User } from '../../shared/models/user.model';

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
      },
      {
        label: 'Agences',
      },
      {
        label: 'Mes Annonces',
        visible: this.isAuthenticated,
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
        icon: 'pi pi-user',
        visible: this.isAuthenticated,
      },
      {
        label: 'Déconnexion',
        icon: 'pi pi-sign-out',
        command: () => {
          this._authService.signOut();
        },
        visible: this.isAuthenticated,
      },
      {
        label: 'Connexion',
        icon: 'pi pi-sign-in',
        command: () => {
          this.router.navigate(['/login']);
        },
        visible: !this.isAuthenticated,
      },
      {
        label: 'Insription',
        icon: 'pi pi-user-plus',
        command: () => {
          this.router.navigate(['/register']);
        },
        visible: !this.isAuthenticated,
      },
    ];
  }
}
