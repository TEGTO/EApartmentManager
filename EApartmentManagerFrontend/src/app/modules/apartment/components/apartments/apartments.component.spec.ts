import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SortMode } from '../../../shared';
import { ApartmentDialogManager } from '../../services/apartment-dialog-manager/apartment-dialog-manager';
import { ApartmentService } from '../../services/apartment-service/apartment-service';
import { ApartmentsComponent } from './apartments.component';

describe('ApartmentsComponent', () => {
  let component: ApartmentsComponent;
  let fixture: ComponentFixture<ApartmentsComponent>;
  let dialogManagerSpy: jasmine.SpyObj<ApartmentDialogManager>;
  let apartmentServiceSpy: jasmine.SpyObj<ApartmentService>;

  beforeEach(() => {
    const dialogManagerMock = jasmine.createSpyObj('ApartmentDialogManager', ['openCreateApartmentMenu']);
    const apartmentServiceMock = jasmine.createSpyObj('ApartmentService', ['getAllApartments']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ApartmentsComponent],
      providers: [
        { provide: ApartmentDialogManager, useValue: dialogManagerMock },
        { provide: ApartmentService, useValue: apartmentServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentsComponent);
    component = fixture.componentInstance;
    dialogManagerSpy = TestBed.inject(ApartmentDialogManager) as jasmine.SpyObj<ApartmentDialogManager>;
    apartmentServiceSpy = TestBed.inject(ApartmentService) as jasmine.SpyObj<ApartmentService>;

    apartmentServiceSpy.getAllApartments.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getApartments on initialization', () => {
    expect(apartmentServiceSpy.getAllApartments).toHaveBeenCalledWith(-1, SortMode.ascending);
  });

  it('should toggle sort mode and call getApartments', () => {
    component.changeSortMode();

    expect(component.isAscendingSort).toBeFalse();
    expect(apartmentServiceSpy.getAllApartments).toHaveBeenCalledWith(-1, SortMode.descending);

    component.changeSortMode();

    expect(component.isAscendingSort).toBeTrue();
    expect(apartmentServiceSpy.getAllApartments).toHaveBeenCalledWith(-1, SortMode.ascending);
  });

  it('should call getApartments when room amount changes', () => {
    component.roomAmount = 3;
    component.changeRoomAmount();

    expect(apartmentServiceSpy.getAllApartments).toHaveBeenCalledWith(3, SortMode.ascending);

    component.roomAmount = -1;
    component.changeRoomAmount();

    expect(component.roomAmount).toBeUndefined();
    expect(apartmentServiceSpy.getAllApartments).toHaveBeenCalledWith(-1, SortMode.ascending);
  });

  it('should open the create apartment menu', () => {
    component.openCreateMenu();

    expect(dialogManagerSpy.openCreateApartmentMenu).toHaveBeenCalled();
  });
});