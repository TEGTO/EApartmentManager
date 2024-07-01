import { Component, OnInit } from '@angular/core';
import { ApartmentDialogManager, ApartmentService } from '../..';
import { Apartment, SortMode } from '../../../shared';

@Component({
  selector: 'apartments',
  templateUrl: './apartments.component.html',
  styleUrl: './apartments.component.scss'
})
export class ApartmentsComponent implements OnInit {
  apartments: Apartment[] = [];
  roomAmount: number | undefined;
  private sortMode: SortMode = SortMode.ascending;

  get apartmentAmount(): number { return this.apartments.length; }
  get isAscendingSort(): boolean { return this.sortMode === SortMode.ascending; }

  constructor(private dialogManager: ApartmentDialogManager, private apartmentService: ApartmentService) { }

  ngOnInit(): void {
    this.getApartments();
  }
  openCreateMenu() {
    this.dialogManager.openCreateApartmentMenu();
  }
  changeSortMode() {
    this.sortMode = this.sortMode === SortMode.ascending ? SortMode.descending : SortMode.ascending;
    this.getApartments();
  }
  changeRoomAmount() {
    this.getApartments();
    if (this.roomAmount !== undefined && this.roomAmount < 0) {
      this.roomAmount = undefined;
    }
  }
  getApartments() {
    let roomAmount = this.roomAmount !== undefined && this.roomAmount !== null && this.roomAmount >= 0 ? this.roomAmount : -1;
    this.apartmentService.getAllApartments(roomAmount, this.sortMode).subscribe(apartments => {
      this.apartments = apartments;
    });
  }
}