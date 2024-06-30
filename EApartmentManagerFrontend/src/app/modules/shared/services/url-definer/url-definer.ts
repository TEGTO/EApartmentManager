import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class URLDefiner {
  abstract combineWithApartmentApiUrl(subpath: string): string;
}
