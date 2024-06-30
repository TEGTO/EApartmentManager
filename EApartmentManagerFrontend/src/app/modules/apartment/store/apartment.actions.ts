import { createAction, props } from "@ngrx/store";
import { Apartment, CreateApartmentRequest, SortMode, UpdateApartmentRequest } from "../../shared";

//Get
export const getAllApartments = createAction(
    '[Apartment] Get All Apartments',
    props<{ rooms: number, sortMode: SortMode }>()
);
export const getAllApartmentsSuccess = createAction(
    '[Apartment] Get All Apartments Success',
    props<{ apartments: Apartment[] }>()
);
export const getAllApartmentsFailure = createAction(
    '[Apartment] Get All Apartments Failure',
    props<{ error: any }>()
);
//Create
export const createApartment = createAction(
    '[Apartment] Create New Apartment',
    props<{ createApartmentRequest: CreateApartmentRequest }>()
);
export const createApartmentSuccess = createAction(
    '[Apartment] Create New Apartment Success',
    props<{ apartment: Apartment }>()
);
export const createApartmentFailure = createAction(
    '[Apartment] Create New Apartment Failure',
    props<{ error: any }>()
);
//Update
export const updateApartment = createAction(
    '[Apartment] Update Apartment',
    props<{ apartmentId: string, updateApartmentRequest: UpdateApartmentRequest }>()
);
export const updateApartmentSuccess = createAction(
    '[Apartment] Update Apartment Success',
    props<{ apartment: Apartment }>()
);
export const updateApartmentFailure = createAction(
    '[Apartment] Update Apartment Failure',
    props<{ error: any }>()
);
//Delete
export const deleteApartment = createAction(
    '[Apartment] Delete Apartment',
    props<{ apartmentId: string }>()
);
export const deleteApartmentSuccess = createAction(
    '[Apartment] Delete Apartment Success',
    props<{ apartmentId: string }>()
);
export const deleteApartmentFailure = createAction(
    '[Apartment] Delete Apartment Failure',
    props<{ error: any }>()
);