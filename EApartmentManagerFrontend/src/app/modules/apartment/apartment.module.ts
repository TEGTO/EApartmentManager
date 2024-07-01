import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { ApartmentBoardComponent, ApartmentControllerService, ApartmentDialogManager, ApartmentDialogManagerService, ApartmentEffects, ApartmentService, ApartmentsComponent, CreateApartmentComponent, apartmentReducer } from '.';
import { ApartmentItemComponent } from './components/apartment-item/apartment-item.component';
import { EditApartmentComponent } from './components/edit-apartment/edit-apartment.component';

@NgModule({
  exports: [
    ApartmentBoardComponent,
  ],
  declarations: [
    ApartmentBoardComponent,
    CreateApartmentComponent,
    ApartmentsComponent,
    ApartmentItemComponent,
    EditApartmentComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [
    CurrencyPipe,
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: "apartments", reducer: apartmentReducer }),
    provideEffects(ApartmentEffects),
    { provide: ApartmentService, useClass: ApartmentControllerService },
    { provide: ApartmentDialogManager, useClass: ApartmentDialogManagerService },
  ]
})
export class ApartmentModule { }
