import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PIcon } from 'src/app/shared/enums/icons.enum';
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
        icon: PIcon.cog,
        styleClass: 'divider',
        routerLink: ['/profile/informations'],
      },
      {
        label: 'Mes annonces',
        icon: PIcon.building,
        styleClass: 'divider',
        routerLink: ['/profile/mes-annonces'],
      },
      {
        label: 'Changer le mot de passe',
        icon: PIcon.lock,
        routerLink: ['/profile/security'],
      },
    ];
  }
}
