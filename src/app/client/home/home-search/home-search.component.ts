import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectItem } from 'primeng/api';
import { PIcon } from 'src/app/shared/enums/icons.enum';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
})
export class HomeSearchComponent {
  options = [{ value: 'meher' }, { value: 'hello' }];
  searchType: SelectItem[] = [
    { label: 'Achat', value: 'Achat' },
    { label: 'Location', value: 'Location' },
  ];

  PIcon = PIcon;

  selectedSearchType = 'Achat';
}
