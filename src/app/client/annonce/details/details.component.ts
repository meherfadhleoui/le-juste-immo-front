import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Annonce } from 'src/app/shared/models/annonce.model';
import { AnnonceService } from 'src/app/shared/services/annonce.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  annonce?: Annonce;
  annonceId = '';
  responsiveOptions: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  showImages: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _annonceService: AnnonceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.annonceId = this.activatedRoute.snapshot.params['id'];
    this.getAnnonce();
  }

  getAnnonce() {
    this._annonceService.getById(this.annonceId).subscribe({
      next: (annonce) => {
        this.annonce = annonce;
        this.annonce.photos = [annonce.principlePhoto, ...annonce.photos];
      },
      error: () => {
        this.router.navigate(['/home']);
      },
    });
  }

  showAllImages() {
    this.showImages = true;
  }
}
