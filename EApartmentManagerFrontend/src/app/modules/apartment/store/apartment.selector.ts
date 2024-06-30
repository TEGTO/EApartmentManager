import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ApartmentState } from "..";

export const selectApartmentState = createFeatureSelector<ApartmentState>('apartments');
export const selectApartments = createSelector(
    selectApartmentState,
    (state: ApartmentState) => state.apartments
);
export const selectApartmentsErrors = createSelector(
    selectApartmentState,
    (state: ApartmentState) => state.error
);