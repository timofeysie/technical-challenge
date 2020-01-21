import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() selectedCountry: any;
  constructor() {
    this.selectedCountry = null;
  }

  ngOnInit() {}
}
