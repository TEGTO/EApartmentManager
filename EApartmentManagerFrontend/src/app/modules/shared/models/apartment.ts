import { UpdateApartmentRequest } from "./dto/update-apartment-request";

export interface Apartment {
    id: string;
    rooms: number;
    name: string;
    price: number;
    description: string;
}

export function getApartmentFromUpdateRequest(id: string, updateRequest: UpdateApartmentRequest) {
    let updatedApartment: Apartment = {
        id: id,
        rooms: updateRequest.rooms,
        name: updateRequest.name,
        price: updateRequest.price,
        description: updateRequest.description,
    }
    return updatedApartment;
}