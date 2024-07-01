import { CurrencyPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApartmentService } from '../..';
import { CreateApartmentComponent } from './create-apartment.component';

describe('CreateApartmentComponent', () => {
  let component: CreateApartmentComponent;
  let fixture: ComponentFixture<CreateApartmentComponent>;
  let apartmentServiceSpy: jasmine.SpyObj<ApartmentService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CreateApartmentComponent>>;

  beforeEach(() => {
    const apartmentServiceMock = jasmine.createSpyObj('ApartmentService', ['createApartment']);
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [CreateApartmentComponent],
      providers: [
        CurrencyPipe,
        { provide: ApartmentService, useValue: apartmentServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateApartmentComponent);
    component = fixture.componentInstance;
    apartmentServiceSpy = TestBed.inject(ApartmentService) as jasmine.SpyObj<ApartmentService>;
    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<CreateApartmentComponent>>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values and validators', () => {
    const form = component.formGroup;
    expect(form).toBeDefined();
    expect(form.get('title')?.value).toBe('');
    expect(form.get('roomAmount')?.value).toBe(1);
    expect(form.get('price')?.value).toBe('$1');
    expect(form.get('description')?.value).toBe('');

    expect(form.get('title')?.valid).toBeFalse();
    expect(form.get('roomAmount')?.valid).toBeTrue();
    expect(form.get('price')?.valid).toBeTrue();
    expect(form.get('description')?.valid).toBeTrue();
  });

  it('should validate the form correctly', () => {
    const form = component.formGroup;

    form.get('title')?.setValue('');
    expect(form.get('title')?.hasError('required')).toBeTrue();
    form.get('title')?.setValue('A very long title that exceeds the maximum length allowed for this field which is ninety-nine characters');
    expect(form.get('title')?.hasError('maxlength')).toBeTrue();

    form.get('roomAmount')?.setValue(0);
    expect(form.get('roomAmount')?.hasError('min')).toBeTrue();
    form.get('roomAmount')?.setValue(10001);
    expect(form.get('roomAmount')?.hasError('max')).toBeTrue();

    form.get('price')?.setValue(undefined);
    expect(form.get('price')?.hasError('required')).toBeTrue();

    form.get('description')?.setValue('A'.repeat(1000));
    expect(form.get('description')?.hasError('maxlength')).toBeTrue();
  });

  it('should submit the form when valid', () => {
    const form = component.formGroup;
    form.get('title')?.setValue('Test Title');
    form.get('roomAmount')?.setValue(2);
    form.get('price')?.setValue('$1000');
    form.get('description')?.setValue('Test Description');

    component.submitForm();

    expect(apartmentServiceSpy.createApartment).toHaveBeenCalledWith({
      name: 'Test Title',
      rooms: 2,
      price: 1000,
      description: 'Test Description'
    });
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should mark the form as touched when invalid', () => {
    const form = component.formGroup;
    form.get('title')?.setValue('');

    component.submitForm();

    expect(form.touched).toBeTrue();
    expect(apartmentServiceSpy.createApartment).not.toHaveBeenCalled();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });
});