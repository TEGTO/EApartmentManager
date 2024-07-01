import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Apartment, CreateApartmentRequest, SortMode, URLDefiner, UpdateApartmentRequest } from '../../..';
import { ApartmentApiService } from './apartment-api.service';

describe('ApartmentApiService', () => {
  let service: ApartmentApiService;
  let httpTestingController: HttpTestingController;
  let mockUrlDefiner: jasmine.SpyObj<URLDefiner>;

  beforeEach(() => {
    mockUrlDefiner = jasmine.createSpyObj('URLDefiner', ['combineWithApartmentApiUrl']);
    mockUrlDefiner.combineWithApartmentApiUrl.and.callFake((subpath: string) => subpath);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApartmentApiService,
        { provide: URLDefiner, useValue: mockUrlDefiner },
      ]
    });

    service = TestBed.inject(ApartmentApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send GET to get all apartments', () => {
    const mockApartments: Apartment[] = [{ id: '1', rooms: 3, name: 'Test Apartment', price: 1000, description: 'Test Description' }];
    const rooms = 3;
    const sortMode = SortMode.ascending;
    const expectedReq = `?sorting=asc&rooms=${rooms}`;

    service.getAllApartments(rooms, sortMode).subscribe(apartments => {
      expect(apartments).toEqual(mockApartments);
    });

    const req = httpTestingController.expectOne(expectedReq);
    expect(req.request.method).toBe('GET');
    req.flush(mockApartments);
  });

  it('should send GET to get apartment by id', () => {
    const mockApartment: Apartment = { id: '1', rooms: 3, name: 'Test Apartment', price: 1000, description: 'Test Description' };
    const id = '1';
    const expectedReq = `/${id}`;

    service.getApartmentById(id).subscribe(apartment => {
      expect(apartment).toEqual(mockApartment);
    });

    const req = httpTestingController.expectOne(expectedReq);
    expect(req.request.method).toBe('GET');
    req.flush(mockApartment);
  });

  it('should send POST to create new apartment', () => {
    const mockApartment: Apartment = { id: '1', rooms: 3, name: 'Test Apartment', price: 1000, description: 'Test Description' };
    const createApartmentRequest: CreateApartmentRequest = { rooms: 3, name: 'Test Apartment', price: 1000, description: 'Test Description' };
    const expectedReq = '';

    service.createApartment(createApartmentRequest).subscribe(result => {
      expect(result).toEqual(mockApartment);
    });

    const req = httpTestingController.expectOne(expectedReq);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(createApartmentRequest);
    req.flush(mockApartment);
  });

  it('should send PUT to update apartment', () => {
    const updateApartmentRequest: UpdateApartmentRequest = { rooms: 3, name: 'Updated Apartment', price: 1200, description: 'Updated Description' };
    const id = '1';
    const expectedReq = `/${id}`;

    service.updateApartment(id, updateApartmentRequest).subscribe();

    const req = httpTestingController.expectOne(expectedReq);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateApartmentRequest);
    req.flush(null);
  });

  it('should send DELETE to delete apartment', () => {
    const id = '1';
    const expectedReq = `/${id}`;

    service.deleteApartment(id).subscribe();

    const req = httpTestingController.expectOne(expectedReq);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});