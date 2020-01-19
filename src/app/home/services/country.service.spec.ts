import { Type } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule, HttpCacheService } from '@app/core';
import { CountryService } from './country.service';

describe('CountryService', () => {
  let countryService: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [HttpCacheService, CountryService]
    });

    countryService = TestBed.get(CountryService);
    httpMock = TestBed.get(HttpTestingController as Type<HttpTestingController>);

    const htttpCacheService = TestBed.get(HttpCacheService);
    htttpCacheService.cleanCache();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getRandomQuote', () => {
    it('should return a string in case of error', () => {
      // Act
      const randomQuoteSubscription = countryService.getCountries({ name: 'toto' });

      // Assert
      randomQuoteSubscription.subscribe((quote: string) => {
        expect(typeof quote).toEqual('string');
        expect(quote).toContain('Error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error'
      });
    });
  });
});
