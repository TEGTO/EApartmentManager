import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Apartment, CreateApartmentRequest, SortMode, UpdateApartmentRequest } from '../../..';
import { BaseApiService } from '../base-api/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ApartmentApiService extends BaseApiService {

  getAllApartments(rooms: number, sortMode: SortMode): Observable<Apartment[]> {
    let sorting = sortMode == SortMode.ascending ? "asc" : "desc";
    return this.getHttpClient().get<Apartment[]>(this.combinePathWithApartmentApiUrl(`?sorting=${sorting}&rooms=${rooms}`)).pipe(
      catchError((resp) => this.handleError(resp))
    );
  }
  getApartmentById(id: string): Observable<Apartment> {
    return this.getHttpClient().get<Apartment>(this.combinePathWithApartmentApiUrl(`/${id}`)).pipe(
      catchError((resp) => this.handleError(resp))
    );
  }
  createApartment(createApartmentRequest: CreateApartmentRequest): Observable<Apartment> {
    return this.getHttpClient().post<Apartment>(this.combinePathWithApartmentApiUrl(``), createApartmentRequest).pipe(
      catchError((resp) => this.handleError(resp))
    );
  }
  updateApartment(id: string, updateApartmentRequest: UpdateApartmentRequest) {
    return this.getHttpClient().put(this.combinePathWithApartmentApiUrl(`/${id}`), updateApartmentRequest).pipe(
      catchError((resp) => this.handleError(resp))
    );
  }
  deleteApartment(id: string) {
    return this.getHttpClient().delete(this.combinePathWithApartmentApiUrl(`/${id}`)).pipe(
      catchError((resp) => this.handleError(resp))
    );
  }
}