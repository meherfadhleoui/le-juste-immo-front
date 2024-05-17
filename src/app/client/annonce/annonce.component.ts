import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-annonce',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss'],
})
export class AnnonceComponent {}
