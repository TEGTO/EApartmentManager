import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createApartment, deleteApartment, getAllApartments, selectApartments, updateApartment } from '../..';
import { Apartment, ApartmentApiService, CreateApartmentRequest, SortMode, UpdateApartmentRequest } from '../../../shared';
import { ApartmentService } from './apartment-service';

@Injectable({
  providedIn: 'root'
})
export class ApartmentControllerService implements ApartmentService {

  constructor(private store: Store, private apartmentApi: ApartmentApiService) { }

  getAllApartments(rooms: number = -1, sortMode: SortMode = SortMode.ascending): Observable<Apartment[]> {
    this.store.dispatch(getAllApartments({ rooms: rooms, sortMode: sortMode }));
    return this.store.select(selectApartments);
  }
  getApartmentById(id: string): Observable<Apartment> {
    return this.apartmentApi.getApartmentById(id);
  }
  createApartment(createApartmentRequest: CreateApartmentRequest): void {
    this.store.dispatch(createApartment({ createApartmentRequest: createApartmentRequest }));
  }
  updateApartment(apartmentId: string, updateApartmentRequest: UpdateApartmentRequest): void {
    this.store.dispatch(updateApartment({ apartmentId: apartmentId, updateApartmentRequest: updateApartmentRequest }));
  }
  deleteApartment(apartmentId: string): void {
    this.store.dispatch(deleteApartment({ apartmentId: apartmentId }));
  }
}