import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { ApartmentControllerService, ApartmentEffects, ApartmentService, apartmentReducer } from '.';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
  ],
  providers: [
    provideAnimationsAsync(),
    provideStore(),
    provideState({ name: "apartments", reducer: apartmentReducer }),
    provideEffects(ApartmentEffects),
    { provide: ApartmentService, useClass: ApartmentControllerService }
  ]
})
export class ApartmentModule { }
