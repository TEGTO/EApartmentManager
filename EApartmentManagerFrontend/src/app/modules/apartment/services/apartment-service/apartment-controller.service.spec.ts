import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { createApartment, deleteApartment, getAllApartments, updateApartment } from '../..';
import { ApartmentApiService, CreateApartmentRequest, SortMode, UpdateApartmentRequest } from '../../../shared';
import { ApartmentControllerService } from './apartment-controller.service';

describe('ApartmentControllerService', () => {
  let mockApiService: jasmine.SpyObj<ApartmentApiService>;
  let mockStore: jasmine.SpyObj<Store>;
  let service: ApartmentControllerService;

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj<ApartmentApiService>('ApartmentApiService', ['getAllApartments', 'getApartmentById',
      'createApartment', 'updateApartment', 'deleteApartment']);
    mockStore = jasmine.createSpyObj<Store>('Store', ['dispatch', 'select']);

    TestBed.configureTestingModule({
      providers: [
        ApartmentControllerService,
        { provide: ApartmentApiService, useValue: mockApiService },
        { provide: Store, useValue: mockStore },
      ]
    });
    service = TestBed.inject(ApartmentControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch getAllApartments and return apartments$', () => {
    const apartmentMock = of([]);
    mockStore.select.and.returnValue(apartmentMock);

    const result = service.getAllApartments();

    expect(mockStore.dispatch).toHaveBeenCalledWith(getAllApartments({ rooms: -1, sortMode: SortMode.ascending }));
    result.subscribe(apartments => {
      expect(apartments).toEqual([]);
    });
  });

  it('should call service getApartmentById and return apartment$', () => {
    const apartmentMock = of();
    mockApiService.getApartmentById.and.returnValue(apartmentMock);
    let someId = "someId";

    const result = service.getApartmentById(someId);

    expect(mockApiService.getApartmentById).toHaveBeenCalledWith(someId);
  });

  it('should dispatch createApartment', () => {
    let createRequest: CreateApartmentRequest = {
      rooms: 1,
      name: "someName",
      price: 100,
      description: "description",
    }

    const result = service.createApartment(createRequest);

    expect(mockStore.dispatch).toHaveBeenCalledWith(createApartment({ createApartmentRequest: createRequest }));
  });

  it('should dispatch updateApartment', () => {
    let updateRequest: UpdateApartmentRequest = {
      rooms: 1,
      name: "someName",
      price: 100,
      description: "description",
    }
    let someId = "someId";

    const result = service.updateApartment(someId, updateRequest);

    expect(mockStore.dispatch).toHaveBeenCalledWith(updateApartment({ apartmentId: someId, updateApartmentRequest: updateRequest }));
  });

  it('should dispatch deleteApartment', () => {
    let someId = "someId";

    const result = service.deleteApartment(someId);

    expect(mockStore.dispatch).toHaveBeenCalledWith(deleteApartment({ apartmentId: someId }));
  });
});