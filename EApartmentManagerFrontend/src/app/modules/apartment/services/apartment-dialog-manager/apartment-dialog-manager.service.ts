import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateApartmentComponent } from '../..';
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
}
