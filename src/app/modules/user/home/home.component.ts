import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectItem } from 'primeng/api';
import { HomeSearchComponent } from './home-search/home-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule, HomeSearchComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
