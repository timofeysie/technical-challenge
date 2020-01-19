import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CountryService } from './services/country.service';
import { ObservableInput } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Logger } from '@app/core';
const log = new Logger('HomeComponent');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  selectionHistory: any[];
  selectedCountry: any;
  errorMessage: string;
  isLoading = false;
  countryName: AbstractControl;
  countryForm: FormGroup;
  countryResults: any;
  constructor(fb: FormBuilder, private CountryService: CountryService) {
    this.selectionHistory = [];
    this.selectedCountry = null;
    this.countryForm = fb.group({
      countryName: []
    });
    this.countryName = this.countryForm.controls['countryName'];
  }

  ngOnInit() {}

  /**
   * Set up the country name value change subscription
   * to implement the business rules for input length.
   *
   */
  ngAfterViewInit() {
    this.countryName.valueChanges
      .pipe(
        map(val => val),
        filter((text: any) => text.length > 2),
        debounceTime(10),
        distinctUntilChanged(),
        switchMap(() => this.submitQuery())
      )
      .subscribe(result => {
        this.handleResult(result);
      });
  }

  onCountrySelectedFromHistory(country: any) {
    this.selectedCountry = country;
  }

  onCountrySelected(country: any) {
    this.selectedCountry = country;
    if (!this.selectionHistory.includes(country)) {
      this.selectionHistory.push(country);
    }
  }

  submitQuery(): ObservableInput<any> {
    this.isLoading = true;
    return this.CountryService.getCountries({ name: this.countryName.value });
  }

  handleResult(result: any) {
    this.isLoading = false;
    if (typeof result === 'string') {
      log.error('result', result);
      this.errorMessage = result;
      this.countryResults = null;
    } else {
      this.errorMessage = null;
      this.countryResults = result.slice(0, 9);
    }
  }
}
