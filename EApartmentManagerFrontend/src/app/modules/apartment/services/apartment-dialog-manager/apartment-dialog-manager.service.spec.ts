import { TestBed } from '@angular/core/testing';

import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CreateApartmentComponent, EditApartmentComponent } from '../..';
import { Apartment } from '../../../shared';
import { ApartmentDialogManagerService } from './apartment-dialog-manager.service';

describe('ApartmentDialogManagerService', () => {
  let service: ApartmentDialogManagerService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        ApartmentDialogManagerService,
        { provide: MatDialog, useValue: spy }
      ]
    });

    service = TestBed.inject(ApartmentDialogManagerService);
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open the create apartment menu', () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(dialogRefSpy);

    const dialogRef = service.openCreateApartmentMenu();

    expect(dialogSpy.open).toHaveBeenCalledWith(CreateApartmentComponent, {
      height: '600px',
      width: '700px',
    });
    expect(dialogRef).toBe(dialogRefSpy);
  });

  it('should open the edit apartment menu', () => {
    const apartment: Apartment = {
      id: "id",
      rooms: 1,
      name: "name",
      price: 100,
      description: ""
    };
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpy.afterClosed.and.returnValue(of(true));
    dialogSpy.open.and.returnValue(dialogRefSpy);

    const dialogRef = service.openEditApartmentMenu(apartment);

    expect(dialogSpy.open).toHaveBeenCalledWith(EditApartmentComponent, {
      height: '600px',
      width: '700px',
      data: apartment
    });
    expect(dialogRef).toBe(dialogRefSpy);
  });
});
