import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CountryService } from './services/country.service';
import { ObservableInput } from 'rxjs';
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
    // using a ver to avoid the lint error:
    // this.countryForm.controls['countryName']
    // doesn't work so disabling for now:
    /* tslint:disable:no-string-literal */
    //const controlName = this.countryForm.controls['countryName'];
    //this.countryName = controlName;
    /* tslint:enable:no-string-literal */

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
      this.selectionHistory.unshift(country);
    }
  }

  submitQuery(): ObservableInput<any> {
    this.isLoading = true;
    return this.countryService.getCountries({ name: this.countryName.value });
  }

  handleResult(result: any) {
    this.isLoading = false;
    if (typeof result === 'string') {
      this.errorMessage = result;
      this.countryResults = null;
    } else {
      this.errorMessage = null;
      this.countryResults = result.slice(0, 9);
    }
  }
}
