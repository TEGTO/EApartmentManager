import { createApartment, createApartmentFailure, createApartmentSuccess, deleteApartment, deleteApartmentFailure, deleteApartmentSuccess, getAllApartments, getAllApartmentsFailure, getAllApartmentsSuccess, updateApartment, updateApartmentFailure, updateApartmentSuccess } from "..";
import { Apartment, CreateApartmentRequest, SortMode, UpdateApartmentRequest } from "../../shared";

describe('Apartment Actions', () => {
    const apartment: Apartment = {
        id: "someId",
        rooms: 1,
        name: "someName",
        price: 100,
        description: "description",
    };
    const apartments: Apartment[] = [apartment];
    const createApartmentRequest: CreateApartmentRequest = {
        rooms: 1,
        name: "someName",
        price: 100,
        description: "description",
    };
    const updateApartmentRequest: UpdateApartmentRequest = {
        rooms: 1,
        name: "someName",
        price: 100,
        description: "description",
    };

    const error = { message: 'An error occurred' };

    describe('Get All Apartments Actions', () => {
        it('should create getAllApartments action', () => {
            const action = getAllApartments({ rooms: -1, sortMode: SortMode.ascending });
            expect(action.type).toBe('[Apartment] Get All Apartments');
        });
        it('should create getAllApartmentsSuccess action', () => {
            const action = getAllApartmentsSuccess({ apartments });
            expect(action.type).toBe('[Apartment] Get All Apartments Success');
            expect(action.apartments).toEqual(apartments);
        });
        it('should create getAllApartmentsFailure action', () => {
            const action = getAllApartmentsFailure({ error });
            expect(action.type).toBe('[Apartment] Get All Apartments Failure');
            expect(action.error).toEqual(error);
        });
    });

    describe('Create New Apartment Actions', () => {
        it('should create createApartment action', () => {
            const action = createApartment({ createApartmentRequest: createApartmentRequest });
            expect(action.type).toBe('[Apartment] Create New Apartment');
            expect(action.createApartmentRequest).toEqual(createApartmentRequest);
        });
        it('should create createApartmentSuccess action', () => {
            const action = createApartmentSuccess({ apartment });
            expect(action.type).toBe('[Apartment] Create New Apartment Success');
            expect(action.apartment).toEqual(apartment);
        });
        it('should create createApartmentFailure action', () => {
            const action = createApartmentFailure({ error });
            expect(action.type).toBe('[Apartment] Create New Apartment Failure');
            expect(action.error).toEqual(error);
        });
    });

    describe('Update Apartment Actions', () => {
        it('should create updateApartment action', () => {
            let someId = "someId";
            const action = updateApartment({ apartmentId: someId, updateApartmentRequest: updateApartmentRequest });
            expect(action.type).toBe('[Apartment] Update Apartment');
            expect(action.apartmentId).toEqual(someId);
            expect(action.updateApartmentRequest).toEqual(updateApartmentRequest);
        });
        it('should create updateApartmentSuccess action', () => {
            const action = updateApartmentSuccess({ apartment });
            expect(action.type).toBe('[Apartment] Update Apartment Success');
            expect(action.apartment).toEqual(apartment);
        });
        it('should create updateApartmentFailure action', () => {
            const action = updateApartmentFailure({ error });
            expect(action.type).toBe('[Apartment] Update Apartment Failure');
            expect(action.error).toEqual(error);
        });
    });

    describe('Delete Apartments Actions', () => {
        const apartmentId = 'someId';

        it('should create deleteApartment action', () => {
            const action = deleteApartment({ apartmentId: apartmentId });
            expect(action.type).toBe('[Apartment] Delete Apartment');
            expect(action.apartmentId).toBe(apartmentId);
        });
        it('should create deleteApartmentSuccess action', () => {
            const action = deleteApartmentSuccess({ apartmentId: apartmentId });
            expect(action.type).toBe('[Apartment] Delete Apartment Success');
            expect(action.apartmentId).toBe(apartmentId);
        });
        it('should create deleteApartmentFailure action', () => {
            const action = deleteApartmentFailure({ error });
            expect(action.type).toBe('[Apartment] Delete Apartment Failure');
            expect(action.error).toEqual(error);
        });
    });
});