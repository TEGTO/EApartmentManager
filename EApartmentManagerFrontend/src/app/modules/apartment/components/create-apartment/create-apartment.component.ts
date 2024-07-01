import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-apartment',
  templateUrl: './create-apartment.component.html',
  styleUrl: './create-apartment.component.scss'
})
export class CreateApartmentComponent implements OnInit {
  formGroup!: FormGroup

  get titleInput() { return this.formGroup.get('title')!; }
  get roomAmountInput() { return this.formGroup.get('roomAmount')!; }
  get priceInput() { return this.formGroup.get('price')!; }
  get descriptionInput() { return this.formGroup.get('description')!; }

  constructor(private currencyPipe: CurrencyPipe) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        title: new FormControl('', [Validators.required, Validators.maxLength(99)]),
        roomAmount: new FormControl(1, [Validators.required, Validators.min(1)]),
        price: new FormControl("$1", [Validators.required, Validators.min(0)]),
        description: new FormControl('', [Validators.maxLength(999)]),
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
