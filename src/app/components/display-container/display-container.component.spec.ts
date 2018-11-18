import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayContainerComponent } from './display-container.component';
import { FlightInfoBoxComponent } from '../flight-info-box/flight-info-box.component';
import { ErrorCardComponent } from '../error-card/error-card.component';
import { LoaderComponent } from '../loader/loader.component';
import { OrderByPipe } from '../../custom-pipes/order-by.pipe';
import { RefineByPricePipe } from '../../custom-pipes/refine-by-price.pipe';
import { SearchService } from '../../services/search.service';
import { HttpClientModule } from '@angular/common/http';
describe('DisplayContainerComponent', () => {
  let component: DisplayContainerComponent;
  let fixture: ComponentFixture<DisplayContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayContainerComponent, LoaderComponent, FlightInfoBoxComponent, ErrorCardComponent, OrderByPipe, RefineByPricePipe ],
      providers: [SearchService],
      imports: [HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayContainerComponent);
    component = fixture.componentInstance;
      component._searchService.details={
        departureCity: 'brisbane', arrivalCity: 'melbourne', oneWay: true, refine: 700, departDate: '2018-11-28', returnDate: '', passengersCount: 1
      },
    component._searchService.dataFound= true;
    component._searchService.oneWayFlights=[{
      flightNo: "BM-715",	departureCity: "brisbane",	arrivalCity: "melbourne",	time: {	depart: "2018-11-28 18:20:00",arrive: "2018-11-28 20:40:00"},
      date: "2018-11-28 18:20:00",	amount: "230.00"}]
    fixture.detectChanges();
  });

  it('should create Display Container component', () => {
    expect(component).toBeTruthy();
  });

  it('should check the sum of price of two way flights',() => {
    component.fly1Way={
      flightNo: "BM-715",
      departureCity: "brisbane",
      arrivalCity: "melbourne",
      time: {
        depart: "2018-11-28 18:20:00",
        arrive: "2018-11-28 20:40:00"
      },
      date: "2018-11-28 18:20:00",
      amount: "230.00"
    };

    component.fly2Way={
      flightNo: "MB-115",
      departureCity: "melbourne",
      arrivalCity: "brisbane",
      time: {
        depart: "2018-11-28 19:40:00",
        arrive: "2018-11-28 22:00:00"
      },
      date: "2018-11-28 19:40:00",
      amount: "300.00"
    };

    component.sum()
    expect(component.total).toEqual(530);
  });

  it(`should have a app-flight-info-box component`, async(() => {
    const fixture = TestBed.createComponent(DisplayContainerComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-flight-info-box')).toBeDefined();
  }));

  it('should have a app-error-card component', async(() => {
    const fixture = TestBed.createComponent(DisplayContainerComponent);
    const compiled = fixture.debugElement.nativeElement;
    component._searchService.dataFound= false;
    component._searchService.oneWayFlights=[]
    expect(compiled.querySelector('app-error-card')).toBeDefined();
  }));
 
});
