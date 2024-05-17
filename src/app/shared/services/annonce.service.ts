import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Annonce } from '../models/annonce.model';

@Injectable({
  providedIn: 'root',
})
export class AnnonceService {
  constructor(private httpClient: HttpClient) {}

  create(annonce: FormData) {
    return this.httpClient.post<{ message: string; body: Annonce }>(
      '/annonce',
      annonce,
    );
  }

  get() {
    const params = new HttpParams().append('showLoader', true);
    return this.httpClient.get<{ totalRecords: number; body: Annonce[] }>(
      '/annonce',
      { params },
    );
  }

  getById(id: string) {
    const params = new HttpParams().append('showLoader', true);
    return this.httpClient.get<Annonce>(`/annonce/${id}`, { params });
  }

  getUserAnnonces(userId: string) {
    const params = new HttpParams().append('showLoader', true);
    return this.httpClient.get<Annonce[]>(`/annonce/annonceur/${userId}`, {
      params,
    });
  }

  activate(id: string) {
    return this.httpClient.put(`/annonce/activate/${id}`, {});
  }

  desactivate(id: string) {
    return this.httpClient.put(`/annonce/desactivate/${id}`, {});
  }

  delete(id: string) {
    return this.httpClient.put(`/annonce/archive/${id}`, {});
  }
}
