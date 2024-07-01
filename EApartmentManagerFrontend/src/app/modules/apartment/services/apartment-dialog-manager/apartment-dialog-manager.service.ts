import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateApartmentComponent, EditApartmentComponent } from '../..';
import { Apartment } from '../../../shared';
import { ApartmentDialogManager } from './apartment-dialog-manager';

@Injectable({
  providedIn: 'root'
})
export class ApartmentDialogManagerService implements ApartmentDialogManager {

  constructor(private dialog: MatDialog) {
  }

  openCreateApartmentMenu(): MatDialogRef<any, any> {
    const dialogRef = this.dialog.open(CreateApartmentComponent, {
      height: '600px',
      width: '700px',
    });
    return dialogRef;
  }
  openEditApartmentMenu(apartment: Apartment): MatDialogRef<any, any> {
    const dialogRef = this.dialog.open(EditApartmentComponent, {
      height: '600px',
      width: '700px',
      data: apartment
    });
    return dialogRef;
  }
}
