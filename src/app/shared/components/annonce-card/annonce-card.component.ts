import { Component, Input } from '@angular/core';
import { Annonce } from '../../models/annonce.model';

@Component({
  selector: 'app-annonce-card',
  templateUrl: './annonce-card.component.html',
  styleUrls: ['./annonce-card.component.scss'],
})
export class AnnonceCardComponent {
  @Input() annonce!: Annonce;
}
