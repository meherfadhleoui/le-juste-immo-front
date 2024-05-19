import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Country } from 'src/app/shared/models/address.model';
import { DataService } from 'src/app/shared/services/data.service';
import { AgencyService } from 'src/app/shared/services/agency.service';
import { Agency } from 'src/app/shared/models/user.models';
import { PaginatorState } from 'primeng/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { convertToNumber } from 'src/app/shared/utils/utils';
import { AgencyFilter } from 'src/app/shared/models/filter.model';
import { GIcon, PIcon } from 'src/app/shared/enums/icons.enum';

@Component({
  selector: 'app-agency',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
})
export class AgencyComponent implements OnInit {
  countries: Country[] = [];
  agencies: Agency[] = [];
  GIcon = GIcon;
  PIcon = PIcon;

  page: number = 0;
  limit: number = 10;
  first: number = 1;
  totalRecords = 0;

  filters: AgencyFilter = {
    nomAgence: '',
    address: {
      pays: '',
      codePostal: '',
      city: '',
    },
  };

  isLoading = false;

  constructor(
    private _dataService: DataService,
    private _agencyService: AgencyService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getUrlQueryParams();
    this.updateQueryParams();
    this.getCountries();
    this.getAgencies();
  }

  getCountries() {
    this._dataService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }

  getAgencies() {
    this.totalRecords = 0;
    this.isLoading = true;
    this._agencyService
      .getAgencies(this.filters, this.page + 1, this.limit)
      .subscribe({
        next: (res) => {
          this.agencies = [...res.body, ...res.body, ...res.body];
          this.totalRecords = res.totalRecords;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  onPageChange(event: PaginatorState) {
    this.page = event.page as number;
    this.limit = event.rows as number;
    this.first = event.first as number;
    this.updateQueryParams();
    this.getAgencies();
  }

  getUrlQueryParams() {
    const params: any = this.route.snapshot.queryParams;
    const { nomAgence, page, limit } = params;
    this.filters.nomAgence = nomAgence || this.filters.nomAgence;
    this.page = convertToNumber(page) || this.page;
    this.limit = convertToNumber(limit) || this.limit;
    this.first = this.page * this.limit;

    if (params.address) {
      this.filters.address = JSON.parse(params.address);
    }
  }

  updateQueryParams() {
    const queryParams: any = { ...this.filters };
    queryParams.address = JSON.stringify(queryParams.address);
    queryParams.page = this.page;
    queryParams.limit = this.limit;
    queryParams.first = this.first;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
