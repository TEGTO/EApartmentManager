import { Injectable } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Injectable({
    providedIn: 'root'
})
export abstract class ApartmentDialogManager {
    abstract openCreateApartmentMenu(): MatDialogRef<any>;
}