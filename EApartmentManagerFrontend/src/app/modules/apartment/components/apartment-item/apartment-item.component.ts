import { Component, Input } from '@angular/core';
import { ApartmentDialogManager, ApartmentService } from '../..';
import { Apartment } from '../../../shared';

@Component({
  selector: 'apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrl: './apartment-item.component.scss'
})
export class ApartmentItemComponent {
  @Input({ required: true })
  apartment!: Apartment;

  get roomName(): string { return this.apartment.rooms > 1 ? "rooms" : "room" };

  constructor(private dialogManager: ApartmentDialogManager, private apartmentService: ApartmentService) { }

  openEditApartmentMenu() {
    this.dialogManager.openEditApartmentMenu(this.apartment);
  }
  deleteApartment(event: Event): void {
    event.stopPropagation();
    this.apartmentService.deleteApartment(this.apartment.id);
  }
}
