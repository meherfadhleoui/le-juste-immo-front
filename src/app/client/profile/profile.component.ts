import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor() {}

  ngOnInit(): void {
    this.initItems();
  }

  initItems() {
    this.items = [
      {
        label: 'Informations personnelles',
        icon: 'pi pi-cog',
        styleClass: 'divider',
        routerLink: ['/profile/informations'],
      },
      {
        label: 'Mes annonces',
        icon: 'pi pi-building',
        styleClass: 'divider',
        routerLink: ['/profile/mes-annonces'],
      },
      {
        label: 'Changer le mot de passe',
        icon: 'pi pi-lock',
        routerLink: ['/profile/security'],
      },
    ];
  }
}
