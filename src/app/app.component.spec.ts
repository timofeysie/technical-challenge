import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DetailsComponent } from './presenters/details/details.component';
import { HistoryComponent } from './presenters/history/history.component';
import { SearchComponent } from './presenters/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from  'ionic-angular';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        IonicModule
      ],
      declarations: [
        AppComponent,
        SearchComponent,
        HistoryComponent,
        DetailsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'new-flare'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('new-flare');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('new-flare app is running!');
  });
});
