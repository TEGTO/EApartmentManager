import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ApartmentBoardComponent } from './apartment-board.component';

describe('ApartmentBoardComponent', () => {
  let component: ApartmentBoardComponent;
  let fixture: ComponentFixture<ApartmentBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApartmentBoardComponent],
      providers: [
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentBoardComponent);
    component = fixture.componentInstance;
  })


  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render child components', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div[class="apatment-board-body"]')).toBeTruthy();
  });
});
