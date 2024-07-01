import { TestBed } from '@angular/core/testing';

import { ApartmentDialogManagerService } from './apartment-dialog-manager.service';

describe('ApartmentDialogManagerService', () => {
  let service: ApartmentDialogManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentDialogManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
