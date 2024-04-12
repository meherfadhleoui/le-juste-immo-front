import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-confirmaton-required',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './confirmaton-required.component.html',
  styleUrls: ['./confirmaton-required.component.scss'],
})
export class ConfirmatonRequiredComponent {}
