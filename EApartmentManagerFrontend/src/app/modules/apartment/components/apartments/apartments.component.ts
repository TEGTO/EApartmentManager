import { Component } from '@angular/core';
import { ApartmentDialogManager } from '../..';
import { SortMode } from '../../../shared';

@Component({
  selector: 'apartments',
  templateUrl: './apartments.component.html',
  styleUrl: './apartments.component.scss'
})
export class ApartmentsComponent {
  Arr = Array; //Array type captured in a variable
  num: number = 200;

  private sortMode: SortMode = SortMode.ascending;

  get isAscendingSort(): boolean { return this.sortMode === SortMode.ascending; }

  constructor(private dialogManager: ApartmentDialogManager) { }

  openCreateMenu() {
    this.dialogManager.openCreateApartmentMenu();
  }
  changeSortMode() {
    this.sortMode = this.sortMode === SortMode.ascending ? SortMode.descending : SortMode.ascending;
  }
}
