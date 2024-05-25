import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, SharedModule, FooterComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  home = { icon: 'pi pi-home', routerLink: '/home' };
  items = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.updateChildRouteData(this.activatedRoute);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }

        route.data.subscribe((data: any) => {
          this.items = data.breadcrumbs || [];
        });
      });
  }

  private updateChildRouteData(route: ActivatedRoute) {
    while (route.firstChild) {
      route = route.firstChild;
    }
    route.data.subscribe((data: any) => {
      this.items = data.breadcrumbs || [];
    });
  }
}
