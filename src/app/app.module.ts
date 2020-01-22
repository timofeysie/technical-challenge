import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './presenters/details/details.component';
import { HistoryComponent } from './presenters/history/history.component';
import { SearchComponent } from './presenters/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsComponent,
    HistoryComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:   [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
