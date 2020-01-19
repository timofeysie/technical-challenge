import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @Input() selectionHistory: any;
  @Output() selectCountryFromHistory = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  onCountrySelected(country: any) {
    this.selectCountryFromHistory.emit(country);
  }
}
