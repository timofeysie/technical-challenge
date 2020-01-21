import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() countries: any;
  @Output() selectCountry = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  onCountrySelected(country: any) {
    this.selectCountry.emit(country);
  }
}
