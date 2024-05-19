import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ScrollService } from './shared/services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'le-juste-immo-front';

  constructor(
    private router: Router,
    private _scrollService: ScrollService,
  ) {}

  ngOnInit() {
    this.scrollToTopOnNavigationEnd();
  }

  scrollToTopOnNavigationEnd() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this._scrollService.scrollToTop();
      });
  }
}
