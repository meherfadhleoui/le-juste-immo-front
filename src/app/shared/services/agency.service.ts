import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency } from '../models/user.models';
import { AgencyFilter } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  constructor(private httpClient: HttpClient) {}

  getAgencies(filters: AgencyFilter, page: number, limit: number) {
    const params = new HttpParams().append('limit', limit).append('page', page);

    return this.httpClient.post<{ body: Agency[]; totalRecords: number }>(
      '/user/agences',
      { filters },
      { params },
    );
  }
}
