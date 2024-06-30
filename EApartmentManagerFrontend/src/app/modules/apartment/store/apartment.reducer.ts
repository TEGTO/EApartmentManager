import { createReducer, on } from "@ngrx/store";
import { createApartmentFailure, createApartmentSuccess, deleteApartmentFailure, deleteApartmentSuccess, getAllApartmentsFailure, getAllApartmentsSuccess, updateApartmentFailure, updateApartmentSuccess } from "..";
import { Apartment } from "../../shared";

export interface ApartmentState {
    apartments: Apartment[],
    error: any
}
const initialApartmentState: ApartmentState = {
    apartments: [],
    error: null
};
export const apartmentReducer = createReducer(
    initialApartmentState,
    //Get
    on(getAllApartmentsSuccess, (state, { apartments: apartments }) => ({
        ...state,
        apartments: apartments,
        error: null
    })),
    on(getAllApartmentsFailure, (state, { error: error }) => ({
        ...state,
        apartments: [],
        error: error
    })),
    //Create
    on(createApartmentSuccess, (state, { apartment: apartment }) => ({
        ...state,
        apartments: [...state.apartments, apartment],
        error: null
    })),
    on(createApartmentFailure, (state, { error: error }) => ({
        ...state,
        error: error
    })),
    //Update
    on(updateApartmentSuccess, (state, { apartment: apartment }) => ({
        ...state,
        apartments: state.apartments.map(a => a.id === apartment.id ? apartment : a),
        error: null
    })),
    on(updateApartmentFailure, (state, { error: error }) => ({
        ...state,
        error: error
    })),
    //Delete
    on(deleteApartmentSuccess, (state, { apartmentId: apartmentId }) => ({
        ...state,
        apartments: state.apartments.filter(x => x.id != apartmentId),
        error: null
    })),
    on(deleteApartmentFailure, (state, { error: error }) => ({
        ...state,
        error: error
    })),
)