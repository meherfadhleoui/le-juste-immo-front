import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, catchError } from 'rxjs';
import { Country, FranceCity } from '../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getCountries() {
    return this.httpClient
      .get<Country[]>('/nomenclature/countries')
      .pipe(catchError(() => EMPTY));
  }

  getFranceCities() {
    return this.httpClient
      .get<FranceCity[]>('/nomenclature/villes')
      .pipe(catchError(() => EMPTY));
  }

  getAssetTypes() {
    return this.httpClient
      .get<string[]>('/nomenclature/typeBien')
      .pipe(catchError(() => EMPTY));
  }

  getEtats() {
    return this.httpClient
      .get<string[]>('/nomenclature/etat')
      .pipe(catchError(() => EMPTY));
  }
}
