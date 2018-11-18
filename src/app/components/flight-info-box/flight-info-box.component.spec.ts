import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInfoBoxComponent } from './flight-info-box.component';
import { SearchService } from '../../services/search.service';
import { HttpClientModule } from '@angular/common/http';

describe('FlightInfoBoxComponent', () => {
  let component: FlightInfoBoxComponent;
  let fixture: ComponentFixture<FlightInfoBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightInfoBoxComponent],
      providers: [SearchService],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInfoBoxComponent);
    component = fixture.componentInstance;
    component._searchService.details = {
      departureCity: 'brisbane', arrivalCity: 'melbourne', oneWay: true, refine: 700, departDate: '2018-11-28', returnDate: '', passengersCount: 1
    },
    component._searchService.dataFound = true;
    fixture.detectChanges();
  });

  it('should create FlightInfoBox component', () => {
    expect(component).toBeTruthy();
  });
});
