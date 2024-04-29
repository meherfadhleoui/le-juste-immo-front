import { Component } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-annonces',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss'],
})
export class AnnoncesComponent {}
