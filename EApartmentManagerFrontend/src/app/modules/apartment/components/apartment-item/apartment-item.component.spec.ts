import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ApartmentDialogManager, ApartmentService } from '../..';
import { ApartmentItemComponent } from './apartment-item.component';

describe('ApartmentItemComponent', () => {
  let component: ApartmentItemComponent;
  let fixture: ComponentFixture<ApartmentItemComponent>;
  let dialogManagerSpy: jasmine.SpyObj<ApartmentDialogManager>;
  let apartmentServiceSpy: jasmine.SpyObj<ApartmentService>;

  beforeEach(() => {
    const dialogManagerMock = jasmine.createSpyObj('ApartmentDialogManager', ['openEditApartmentMenu']);
    const apartmentServiceMock = jasmine.createSpyObj('ApartmentService', ['deleteApartment']);

    TestBed.configureTestingModule({
      declarations: [ApartmentItemComponent],
      providers: [
        { provide: ApartmentDialogManager, useValue: dialogManagerMock },
        { provide: ApartmentService, useValue: apartmentServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentItemComponent);
    component = fixture.componentInstance;
    dialogManagerSpy = TestBed.inject(ApartmentDialogManager) as jasmine.SpyObj<ApartmentDialogManager>;
    apartmentServiceSpy = TestBed.inject(ApartmentService) as jasmine.SpyObj<ApartmentService>;

    component.apartment = { id: "1", name: 'Test Apartment', rooms: 2, price: 1000, description: "desc" };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the edit apartment menu', () => {
    component.openEditApartmentMenu();

    expect(dialogManagerSpy.openEditApartmentMenu).toHaveBeenCalledWith(component.apartment);
  });

  it('should delete the apartment', () => {
    const event = new Event('click');
    spyOn(event, 'stopPropagation');

    component.deleteApartment(event);

    expect(event.stopPropagation).toHaveBeenCalled();
    expect(apartmentServiceSpy.deleteApartment).toHaveBeenCalledWith(component.apartment.id);
  });

  it('should correctly format room name', () => {
    component.apartment.rooms = 1;
    expect(component.roomName).toBe('room');

    component.apartment.rooms = 2;
    expect(component.roomName).toBe('rooms');
  });

  it('should handle button click events', () => {
    spyOn(component, 'openEditApartmentMenu');
    spyOn(component, 'deleteApartment');

    const editButton = fixture.debugElement.query(By.css('.apartment-item-wrapper'));
    editButton.triggerEventHandler('click', null);
    expect(component.openEditApartmentMenu).toHaveBeenCalled();

    const deleteButton = fixture.debugElement.query(By.css('.control-menu button'));
    deleteButton.triggerEventHandler('click', null);
    expect(component.deleteApartment).toHaveBeenCalled();
  });
});