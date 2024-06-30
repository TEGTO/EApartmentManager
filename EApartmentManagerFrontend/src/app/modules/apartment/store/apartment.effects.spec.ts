import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable, of, throwError } from "rxjs";
import { Apartment, ApartmentApiService, CreateApartmentRequest, SortMode, UpdateApartmentRequest } from "../../shared";
import { createApartment, createApartmentFailure, createApartmentSuccess, deleteApartment, deleteApartmentFailure, deleteApartmentSuccess, getAllApartments, getAllApartmentsFailure, getAllApartmentsSuccess, updateApartment, updateApartmentFailure, updateApartmentSuccess } from "./apartment.actions";
import { ApartmentEffects } from "./apartment.effects";

describe('ApartmentEffects', () => {
    let actions$: Observable<any>;
    let effects: ApartmentEffects;
    let mockApartmentApiService: jasmine.SpyObj<ApartmentApiService>;

    const mockApartment: Apartment = { id: '1', rooms: 3, name: 'Test Apartment', price: 1000, description: 'Test Description' };
    const mockApartments: Apartment[] = [mockApartment];
    const mockError = { message: 'An error occurred' };
    const mockCreateApartmentRequest: CreateApartmentRequest = { rooms: 3, name: 'Test Apartment', price: 1000, description: 'Test Description' };
    const mockUpdateApartmentRequest: UpdateApartmentRequest = { rooms: 3, name: 'Test Apartment', price: 1000, description: 'Test Description' };

    beforeEach(() => {
        mockApartmentApiService = jasmine.createSpyObj<ApartmentApiService>('ApartmentApiService', ['getAllApartments', 'getApartmentById', 'createApartment', 'updateApartment', 'deleteApartment']);
        mockApartmentApiService.getAllApartments.and.returnValue(of(mockApartments));

        TestBed.configureTestingModule({
            providers: [
                ApartmentEffects,
                provideMockActions(() => actions$),
                { provide: ApartmentApiService, useValue: mockApartmentApiService }
            ]
        });

        effects = TestBed.inject(ApartmentEffects);
    });

    describe('getApartments$', () => {
        it('should return a getAllApartmentsSuccess action, with apartments, on success', (done) => {
            const action = getAllApartments({ rooms: 3, sortMode: SortMode.ascending });
            const outcome = getAllApartmentsSuccess({ apartments: mockApartments });

            actions$ = of(action);
            mockApartmentApiService.getAllApartments.and.returnValue(of(mockApartments));

            effects.getApartments$.subscribe(result => {
                expect(result).toEqual(outcome);
                expect(mockApartmentApiService.getAllApartments).toHaveBeenCalledWith(3, SortMode.ascending);
                done();
            });
        });
        it('should return a getAllApartmentsFailure action, with error, on failure', (done) => {
            const action = getAllApartments({ rooms: 3, sortMode: SortMode.ascending });
            const outcome = getAllApartmentsFailure({ error: mockError.message });

            actions$ = of(action);
            mockApartmentApiService.getAllApartments.and.returnValue(throwError(mockError));

            effects.getApartments$.subscribe(result => {
                expect(result).toEqual(outcome);
                expect(mockApartmentApiService.getAllApartments).toHaveBeenCalledWith(3, SortMode.ascending);
                done();
            });
        });
    });

    describe('createApartment$', () => {
        it('should return a createApartmentSuccess action, with apartment, on success', (done) => {
            const action = createApartment({ createApartmentRequest: mockCreateApartmentRequest });
            const outcome = createApartmentSuccess({ apartment: mockApartment });

            actions$ = of(action);
            mockApartmentApiService.createApartment.and.returnValue(of(mockApartment));

            effects.createApartment$.subscribe(result => {
                expect(result).toEqual(outcome);
                expect(mockApartmentApiService.createApartment).toHaveBeenCalledWith(mockCreateApartmentRequest);
                done();
            });
        });
        it('should return a createApartmentFailure action, with error, on failure', (done) => {
            const action = createApartment({ createApartmentRequest: mockCreateApartmentRequest });
            const outcome = createApartmentFailure({ error: mockError.message });

            actions$ = of(action);
            mockApartmentApiService.createApartment.and.returnValue(throwError(mockError));

            effects.createApartment$.subscribe(result => {
                expect(result).toEqual(outcome);
                expect(mockApartmentApiService.createApartment).toHaveBeenCalledWith(mockCreateApartmentRequest);
                done();
            });
        });
    });

    describe('updateApartment$', () => {
        it('should return a updateApartmentSuccess action, with apartment, on success', (done) => {
            const action = updateApartment({ apartmentId: '1', updateApartmentRequest: mockUpdateApartmentRequest });
            const outcome = updateApartmentSuccess({ apartment: mockApartment });

            actions$ = of(action);
            mockApartmentApiService.updateApartment.and.returnValue(of(outcome));

            effects.updateApartment$.subscribe(result => {
                expect(result).toEqual(outcome);
                expect(mockApartmentApiService.updateApartment).toHaveBeenCalledWith('1', mockUpdateApartmentRequest);
                done();
            });
        });
        it('should return a updateApartmentFailure action, with error, on failure', (done) => {
            const action = updateApartment({ apartmentId: '1', updateApartmentRequest: mockUpdateApartmentRequest });
            const outcome = updateApartmentFailure({ error: mockError.message });

            actions$ = of(action);
            mockApartmentApiService.updateApartment.and.returnValue(throwError(mockError));

            effects.updateApartment$.subscribe(result => {
                expect(result).toEqual(outcome);
                expect(mockApartmentApiService.updateApartment).toHaveBeenCalledWith('1', mockUpdateApartmentRequest);
                done();
            });
        });
    });

    describe('deleteApartment$', () => {
        it('should return a deleteApartmentSuccess action, with apartmentId, on success', (done) => {
            const action = deleteApartment({ apartmentId: '1' });
            const outcome = deleteApartmentSuccess({ apartmentId: '1' });

            actions$ = of(action);
            mockApartmentApiService.deleteApartment.and.returnValue(of({}));

            effects.deleteApartment$.subscribe(result => {
                expect(result).toEqual(outcome);
                expect(mockApartmentApiService.deleteApartment).toHaveBeenCalledWith('1');
                done();
            });
        });
        it('should return a deleteApartmentFailure action, with error, on failure', (done) => {
            const action = deleteApartment({ apartmentId: '1' });
            const outcome = deleteApartmentFailure({ error: mockError.message });

            actions$ = of(action);
            mockApartmentApiService.deleteApartment.and.returnValue(throwError(mockError));

            effects.deleteApartment$.subscribe(result => {
                expect(result).toEqual(outcome);
                expect(mockApartmentApiService.deleteApartment).toHaveBeenCalledWith('1');
                done();
            });
        });
    });
});