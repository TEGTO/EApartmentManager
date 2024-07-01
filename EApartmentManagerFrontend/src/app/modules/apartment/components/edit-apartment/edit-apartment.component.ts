import { CurrencyPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Apartment } from '../../../shared';

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

  constructor(@Inject(MAT_DIALOG_DATA) public apartment: Apartment, private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        title: new FormControl(this.apartment.name, [Validators.required, Validators.maxLength(99)]),
        roomAmount: new FormControl(this.apartment.rooms, [Validators.required, Validators.min(1), Validators.max(10000)]),
        price: new FormControl(`$${this.apartment.price}`, [Validators.required, Validators.min(0)]),
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

    }
    else {
      this.formGroup.markAllAsTouched();
    }
  }
}
