import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  name: (c: CountryContext) => `/rest/v2/name/${c.name}`,
  code: (c: CountryContext) => `/rest/v2/alpha/${c.code}`
};

export interface CountryContext {
  name?: string;
  code?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Using the Rest Countries API:
   * https://restcountries.eu/rest/v2/name/{name}
   * @param context CountryContext
   */
  getCountriesByName(context: CountryContext): Observable<string> {
    return this.httpClient
      .get('https://restcountries.eu'+routes.name(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load countries :-('))
      );
  }

  /**
   * Using the Rest Countries API:
   * https://restcountries.eu/rest/v2/alpha/{code}
   * @param context CountryContext
   */
  getCountriesByCode(context: CountryContext): Observable<string> {
    return this.httpClient
      .get('https://restcountries.eu'+routes.code(context))
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not load countries :-('))
      );
  }
  
}
