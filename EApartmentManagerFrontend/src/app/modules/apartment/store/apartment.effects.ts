import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { createApartment, createApartmentFailure, createApartmentSuccess, deleteApartment, deleteApartmentFailure, deleteApartmentSuccess, getAllApartments, getAllApartmentsFailure, getAllApartmentsSuccess, updateApartment, updateApartmentFailure, updateApartmentSuccess } from "..";
import { Apartment, ApartmentApiService, getApartmentFromUpdateRequest } from "../../shared";

@Injectable()
export class ApartmentEffects {
    constructor(private actions$: Actions,
        private apiService: ApartmentApiService) { }

    getApartments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAllApartments),
            mergeMap((action) =>
                this.apiService.getAllApartments(action.rooms, action.sortMode).pipe(
                    map((apartments) => getAllApartmentsSuccess({ apartments: apartments })),
                    catchError(error => of(getAllApartmentsFailure({ error: error.message })))
                )
            )
        )
    );
    createApartment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createApartment),
            mergeMap((action) =>
                this.apiService.createApartment(action.createApartmentRequest).pipe(
                    map((apartment) => createApartmentSuccess({ apartment: apartment })),
                    catchError(error => of(createApartmentFailure({ error: error.message })))
                )
            )
        )
    );
    updateApartment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateApartment),
            mergeMap((action) => {
                let updatedApartment: Apartment = getApartmentFromUpdateRequest(action.apartmentId, action.updateApartmentRequest);
                return this.apiService.updateApartment(action.apartmentId, action.updateApartmentRequest).pipe(
                    map(() => updateApartmentSuccess({ apartment: updatedApartment })),
                    catchError(error => of(updateApartmentFailure({ error: error.message })))
                )
            }
            )
        )
    );
    deleteApartment$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteApartment),
            mergeMap((action) =>
                this.apiService.deleteApartment(action.apartmentId).pipe(
                    map(() => deleteApartmentSuccess({ apartmentId: action.apartmentId })),
                    catchError(error => of(deleteApartmentFailure({ error: error.message })))
                )
            )
        )
    );
}