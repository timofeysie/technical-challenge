import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CountryService } from './services/country.service';
import { ObservableInput, forkJoin, of } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'new-flare';
  selectionHistory: any[];
  selectedCountry: any;
  errorMessage: string;
  isLoading = false;
  countryName: AbstractControl;
  countryForm: FormGroup;
  countryResults: any;
  constructor(fb: FormBuilder, private countryService: CountryService) {
    this.selectionHistory = [];
    this.selectedCountry = null;
    this.countryForm = fb.group({
      countryName: []
    });
    /** Setup a variable to listen for changes in the input field. */
    this.countryName = this.countryForm.controls['countryName'];
  }

  ngOnInit() {}

  /**
   * Pipe country name value changes as an observable and
   * implement the business rules for input length.
   * Also debounce and ignore out of sync results.
   */
  ngAfterViewInit() {
    this.countryName.valueChanges
      .pipe(
        map(val => val),
        filter((text: any) => {
          if (text.length <= 2) {
            this.countryResults = [];
          } else if (text.length > 2) {
            return text;
          }
        }),
        debounceTime(10),
        distinctUntilChanged(),
        switchMap(() => this.submitQueries())
      )
      .subscribe(results => {
        this.handleResult(results);
      });
  }

  /**
   * Populate the details component with a country chosen from the history component.
   * @param country 
   */
  onCountrySelectedFromHistory(country: any) {
    this.selectedCountry = country;
  }

  /** Populate the details component with the chosen country from teh search results. */
  onCountrySelected(country: any) {
    this.selectedCountry = country;
    if (!this.selectionHistory.includes(country)) {
      this.selectionHistory.unshift(country);
    }
  }

  /** Make two API calls and use forJoin to return both when complete. */
  submitQueries(): ObservableInput<any> {
    this.isLoading = true;
    let codes = this.countryService.getCountriesByCode({ code: this.countryName.value });
    let countries = this.countryService.getCountriesByName({ name: this.countryName.value });
   return forkJoin([codes, countries]);
  }

  /**
   * 
   * @param results array of codes and country results.
   */
  handleResult(results: any) {
    this.isLoading = false;
    let codes = results[0];
    this.countryResults  = results[1].concat(codes);
  }
}
