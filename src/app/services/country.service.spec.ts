import { Type } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountryService } from './country.service';

describe('CountryService', () => {
  let countryService: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: []
    });

    countryService = TestBed.get(CountryService);
    httpMock = TestBed.get(HttpTestingController as Type<HttpTestingController>);

  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getRandomQuote', () => {

    it('should return a country object', () => {
      // Arrange
      const mockQuote ='a random quote' ;

      // Act
      const randomQuoteSubscription = countryService.getCountriesByName({ name: 'moroco' });

      // Assert
      randomQuoteSubscription.subscribe((quote: string) => {
        expect(quote).toEqual(mockQuote);
      });
      httpMock.expectOne({}).flush(mockQuote);
    });

    it('should return a string in case of error', () => {
      // Act
      const randomQuoteSubscription = countryService.getCountriesByName({ name: 'toto' });

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
