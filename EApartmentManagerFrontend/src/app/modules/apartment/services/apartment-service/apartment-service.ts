import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Apartment, CreateApartmentRequest, SortMode, UpdateApartmentRequest } from "../../../shared";

@Injectable({
    providedIn: 'root'
})
export abstract class ApartmentService {
    abstract getAllApartments(rooms: number, sortMode: SortMode): Observable<Apartment[]>;
    abstract getApartmentById(id: string): Observable<Apartment>;
    abstract createApartment(createApartmentRequest: CreateApartmentRequest): void;
    abstract updateApartment(apartmentId: string, updateApartmentRequest: UpdateApartmentRequest): void;
    abstract deleteApartment(apartmentId: string): void;
}