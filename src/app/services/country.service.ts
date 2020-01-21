import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  quote: (c: CountryContext) => `/rest/v2/name/${c.name}`
};

export interface CountryContext {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  getCountries(context: CountryContext): Observable<string> {
    return this.httpClient
      .get('https://restcountries.eu/rest/v2/name/'+context.name)
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load countries :-('))
      );
  }
}
