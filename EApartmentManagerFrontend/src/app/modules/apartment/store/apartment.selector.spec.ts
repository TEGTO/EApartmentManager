import { ApartmentState } from "..";
import { selectApartmentState, selectApartments, selectApartmentsErrors } from "./apartment.selector";

describe('Apartment Selectors', () => {
    const initialState: ApartmentState = {
        apartments: [
            { id: "1", rooms: 2, name: "Apartment 1", price: 1000, description: "Description 1" },
            { id: "2", rooms: 3, name: "Apartment 2", price: 2000, description: "Description 2" },
        ],
        error: null
    };
    const errorState: ApartmentState = {
        apartments: [],
        error: 'An error occurred'
    };

    it('should select the apartment state', () => {
        const result = selectApartmentState.projector(initialState);
        expect(result).toEqual(initialState);
    });

    it('should select all apartments', () => {
        const result = selectApartments.projector(initialState);
        expect(result).toEqual(initialState.apartments);
    });

    it('should select apartment errors', () => {
        const result = selectApartmentsErrors.projector(errorState);
        expect(result).toEqual(errorState.error);
    });
});