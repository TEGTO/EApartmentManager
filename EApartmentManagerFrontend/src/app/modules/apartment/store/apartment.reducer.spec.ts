import { Apartment } from "../../shared";
import { createApartmentFailure, createApartmentSuccess, deleteApartmentFailure, deleteApartmentSuccess, getAllApartmentsFailure, getAllApartmentsSuccess, updateApartmentFailure, updateApartmentSuccess } from "./apartment.actions";
import { ApartmentState, apartmentReducer } from "./apartment.reducer";

describe('ApartmentReducer', () => {
    const initialState: ApartmentState = {
        apartments: [],
        error: null
    };

    const mockApartments: Apartment[] = [
        { id: '1', rooms: 2, name: 'Apartment 1', price: 1000, description: 'Description 1' },
        { id: '2', rooms: 3, name: 'Apartment 2', price: 2000, description: 'Description 2' }
    ];

    it('should return the initial state', () => {
        const action = { type: 'Unknown' } as any;
        const state = apartmentReducer(initialState, action);
        expect(state).toBe(initialState);
    });

    it('should handle getAllApartmentsSuccess', () => {
        const action = getAllApartmentsSuccess({ apartments: mockApartments });
        const state = apartmentReducer(initialState, action);
        expect(state.apartments).toEqual(mockApartments);
        expect(state.error).toBeNull();
    });

    it('should handle getAllApartmentsFailure', () => {
        const error = 'Error';
        const action = getAllApartmentsFailure({ error });
        const state = apartmentReducer(initialState, action);
        expect(state.apartments).toEqual([]);
        expect(state.error).toEqual(error);
    });

    it('should handle createApartmentSuccess', () => {
        const newApartment: Apartment = { id: '3', rooms: 1, name: 'Apartment 3', price: 1500, description: 'Description 3' };
        const action = createApartmentSuccess({ apartment: newApartment });
        const state = apartmentReducer(initialState, action);
        expect(state.apartments).toEqual([newApartment]);
        expect(state.error).toBeNull();
    });

    it('should handle createApartmentFailure', () => {
        const error = 'Error';
        const action = createApartmentFailure({ error });
        const state = apartmentReducer(initialState, action);
        expect(state.error).toEqual(error);
    });

    it('should handle updateApartmentSuccess', () => {
        const updatedApartment: Apartment = { id: '1', rooms: 2, name: 'Updated Apartment 1', price: 1200, description: 'Updated Description 1' };
        const action = updateApartmentSuccess({ apartment: updatedApartment });
        const state = apartmentReducer({ ...initialState, apartments: mockApartments }, action);
        expect(state.apartments).toEqual([updatedApartment, mockApartments[1]]);
        expect(state.error).toBeNull();
    });

    it('should handle updateApartmentFailure', () => {
        const error = 'Error';
        const action = updateApartmentFailure({ error });
        const state = apartmentReducer(initialState, action);
        expect(state.error).toEqual(error);
    });

    it('should handle deleteApartmentSuccess', () => {
        const apartmentId = '1';
        const action = deleteApartmentSuccess({ apartmentId });
        const state = apartmentReducer({ ...initialState, apartments: mockApartments }, action);
        expect(state.apartments).toEqual([mockApartments[1]]);
        expect(state.error).toBeNull();
    });

    it('should handle deleteApartmentFailure', () => {
        const error = 'Error';
        const action = deleteApartmentFailure({ error });
        const state = apartmentReducer(initialState, action);
        expect(state.error).toEqual(error);
    });
});