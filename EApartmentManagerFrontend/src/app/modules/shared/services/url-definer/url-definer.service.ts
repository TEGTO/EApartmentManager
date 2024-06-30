import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { URLDefiner } from './url-definer';

@Injectable({
  providedIn: 'root'
})
export class URLDefinerService extends URLDefiner {
  override combineWithApartmentApiUrl(subpath: string): string {
    return environment.api + "/auth" + subpath;
  }
}
