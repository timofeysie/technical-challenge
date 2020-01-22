import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,OnChanges {
  @Input() countries: any;
  @Output() selectCountry = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes',changes);
    if (typeof changes.currentValue === 'string') {
      this.countries = [];
    }
  }

  onCountrySelected(country: any) {
    this.selectCountry.emit(country);
  }
}
