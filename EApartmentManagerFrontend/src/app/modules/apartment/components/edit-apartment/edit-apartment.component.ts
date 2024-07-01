import { CurrencyPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApartmentService } from '../..';
import { Apartment, UpdateApartmentRequest } from '../../../shared';

@Component({
  selector: 'app-edit-apartment',
  templateUrl: './edit-apartment.component.html',
  styleUrl: './edit-apartment.component.scss'
})
export class EditApartmentComponent {
  formGroup!: FormGroup

  get titleInput() { return this.formGroup.get('title')!; }
  get roomAmountInput() { return this.formGroup.get('roomAmount')!; }
  get priceInput() { return this.formGroup.get('price')!; }
  get descriptionInput() { return this.formGroup.get('description')!; }

  constructor(@Inject(MAT_DIALOG_DATA) public apartment: Apartment, private currencyPipe: CurrencyPipe,
    private apartmentService: ApartmentService, private dialogRef: MatDialogRef<EditApartmentComponent>) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        title: new FormControl(this.apartment.name, [Validators.required, Validators.maxLength(99)]),
        roomAmount: new FormControl(this.apartment.rooms, [Validators.required, Validators.min(1), Validators.max(10000)]),
        price: new FormControl(`$${this.apartment.price}`, [Validators.required]),
        description: new FormControl(this.apartment.description, [Validators.maxLength(999)]),
      });

    this.formGroup.valueChanges.subscribe(form => {
      if (form.price) {
        const cleanedPrice = String(form.price).replace(/\D/g, '');
        const formattedPrice = this.currencyPipe.transform(cleanedPrice, 'USD', 'symbol', '1.0-0');
        this.formGroup.patchValue(
          {
            price: formattedPrice
          }, { emitEvent: false });
      }
    });
  }
  submitForm() {
    if (this.formGroup.valid) {
      let updateRequest = this.getRequestFromForm();
      this.apartmentService.updateApartment(this.apartment.id, updateRequest);
      this.dialogRef.close();
    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
  private getRequestFromForm() {
    const formValue = this.formGroup.value;
    let price = parseFloat(String(formValue.price).replace(/\D/g, ''));
    const createRequest: UpdateApartmentRequest =
    {
      rooms: formValue.roomAmount,
      name: formValue.title,
      price: price,
      description: formValue.description,
    }
    return createRequest;
  }
}