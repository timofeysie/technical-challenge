import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CountryService } from './services/country.service';
import { HistoryComponent } from './presenters/history/history.component';
import { DetailsComponent } from './presenters/details/details.component';
import { SearchComponent } from './presenters/search/search.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ],
  entryComponents: [HomeComponent],
  declarations: [HomeComponent, HistoryComponent, DetailsComponent, SearchComponent]
})
export class HomeModule {}
