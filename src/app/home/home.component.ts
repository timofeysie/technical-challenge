import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CountryService } from './country.service';
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
  errorMessage: string;
  isLoading = false;
  countryName: AbstractControl;
  countryForm: FormGroup;
  countryResult: any;
  constructor(fb: FormBuilder, private CountryService: CountryService) {
    this.countryForm = fb.group({
      countryName: []
    });
    this.countryName = this.countryForm.controls['countryName'];
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.countryName.valueChanges
      .pipe(
        map(val => val),
        filter((text: any) => text.length > 2),
        debounceTime(10),
        distinctUntilChanged(),
        switchMap(() => this.submitQyery())
      )
      .subscribe(result => {
        this.handleResult(result);
      });
  }

  submitQyery(): ObservableInput<any> {
    this.isLoading = true;
    return this.CountryService.getCountries({ name: this.countryName.value });
  }

  handleResult(result: any) {
    this.isLoading = false;
    if (typeof result === 'string') {
      log.error('result', result);
      this.errorMessage = result;
      this.countryResult = null;
    } else {
      this.errorMessage = null;
      this.countryResult = result;
    }
  }
}
