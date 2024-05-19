import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GIcon } from '../../enums/icons.enum';

@Component({
  selector: 'icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() name!: GIcon;
  @Input() styleClass = '';
  @Input() exist?: boolean = true;
}
