import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {}
