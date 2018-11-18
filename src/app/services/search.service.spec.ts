import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { environment } from '../../environments/environment';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });
    // inject the service
    service = TestBed.get(SearchService);
    httpMock = TestBed.get(HttpTestingController);
    
  });

  it('should be created', inject([SearchService], (service) => {
    expect(service).toBeTruthy();
  }));

  it('should get flight data',
    inject(
      [HttpTestingController, SearchService],
      (httpMock, service) => {
        const mockFlightDetails = {Flights:[
      {
        flightNo:"BM-715",
        departureCity:"brisbane",
        arrivalCity:"melbourne",
        time:{
           depart:"2018-11-28 18:20:00",
           arrive:"2018-11-28 20:40:00"
        },
        date:"2018-11-28 18:20:00",
        amount:"230.00"
     },
     {
        flightNo:"MA-503",
        departureCity:"melbourne",
        arrivalCity:"adelaide",
        time:{
           depart:"2018-11-27 11:00:00",
           arrive:"2018-11-27 12:20:00"
        },
        date:"2018-11-27 03:30:00",
        amount:"120.00"
     }
    ]};
        service.getCitiesData().subscribe((flight) => {
              expect(flight).toEqual(mockFlightDetails);
          }
        );

        const mockReq = httpMock.expectOne(environment.apiUrl);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(mockFlightDetails);

        httpMock.verify();
      }
    )
  );

  it('should get arrival and departure cities list',inject([SearchService], (service) => {
    const mockFlightDetails ={flights: [
      {
        flightNo:"BM-715",
        departureCity:"brisbane",
        arrivalCity:"melbourne",
        time:{
           depart:"2018-11-28 18:20:00",
           arrive:"2018-11-28 20:40:00"
        },
        date:"2018-11-28 18:20:00",
        amount:"230.00"
     },
     {
        flightNo:"MA-503",
        departureCity:"melbourne",
        arrivalCity:"adelaide",
        time:{
           depart:"2018-11-27 11:00:00",
           arrive:"2018-11-27 12:20:00"
        },
        date:"2018-11-27 03:30:00",
        amount:"120.00"
     }
    ]};
          service.getCitiesList(mockFlightDetails)
          expect(service.originCities).toEqual(['brisbane','melbourne']);
          expect(service.destinationCities).toEqual(['melbourne','adelaide']);
  }));

  it('should get matched flight details',inject([SearchService], (service) => {
    const mockFlightDetails ={flights: [
      {
        flightNo:"BM-715",
        departureCity:"brisbane",
        arrivalCity:"melbourne",
        time:{
           depart:"2018-11-28 18:20:00",
           arrive:"2018-11-28 20:40:00"
        },
        date:"2018-11-28 18:20:00",
        amount:"230.00"
     },
     {
        flightNo:"MA-503",
        departureCity:"melbourne",
        arrivalCity:"adelaide",
        time:{
           depart:"2018-11-27 11:00:00",
           arrive:"2018-11-27 12:20:00"
        },
        date:"2018-11-27 03:30:00",
        amount:"120.00"
     }
    ]};
    const params= {
      departureCity: 'melbourne', arrivalCity: 'adelaide', departDate: '2018-11-27', returnDate: '', oneWay: true, passengersCount: 1
    }
          expect(service.getMatchingFlights(mockFlightDetails, params)).toEqual([{
            flightNo:"MA-503",
            departureCity:"melbourne",
            arrivalCity:"adelaide",
            time:{
               depart:"2018-11-27 11:00:00",
               arrive:"2018-11-27 12:20:00"
            },
            date:"2018-11-27 03:30:00",
            amount:"120.00"
         }]);
          
  }));
});
