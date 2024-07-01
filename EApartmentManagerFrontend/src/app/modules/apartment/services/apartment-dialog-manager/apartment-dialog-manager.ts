import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Apartment } from "../../../shared";

@Injectable({
    providedIn: 'root'
})
export abstract class ApartmentDialogManager {
    abstract openCreateApartmentMenu(): MatDialogRef<any>;
    abstract openEditApartmentMenu(apartment: Apartment): MatDialogRef<any>;
}