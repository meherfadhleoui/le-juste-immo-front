import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeSearchComponent } from './home-search/home-search.component';
import { AnnonceService } from 'src/app/shared/services/annonce.service';
import { Annonce } from 'src/app/shared/models/annonce.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule, HomeSearchComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  annonces: Annonce[] = [];

  constructor(
    private _annonceService: AnnonceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this._annonceService.get().subscribe((res) => {
      this.annonces = res.body;
    });
  }

  navigateToAnnonce(id: string) {
    this.router.navigate([`/annonce/${id}`]);
  }
}
