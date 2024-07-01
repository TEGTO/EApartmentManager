import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentBoardComponent } from './apartment-board.component';

describe('ApartmentBoardComponent', () => {
  let component: ApartmentBoardComponent;
  let fixture: ComponentFixture<ApartmentBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
