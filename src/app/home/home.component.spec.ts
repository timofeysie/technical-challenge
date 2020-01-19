import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeComponent } from './home.component';
import { CountryService } from './services/country.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        CoreModule,
        SharedModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [HomeComponent],
      providers: [CountryService, { provide: FormBuilder, useValue: formBuilder }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
