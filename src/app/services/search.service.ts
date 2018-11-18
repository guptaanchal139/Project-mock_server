import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Flights } from '../interfaces/flightDetails'
import { BookingDetails } from '../interfaces/bookingDetails';
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  /**
  * Service variables common for all components
  */
  public originCities: string[];
  public destinationCities: string[];
  public flightDetails: Flights[];
  public details: BookingDetails;
  public oneWayFlights: Flights[];
  public twoWayFlights: Flights[];
  public dataFound: boolean = false;
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  /**
  * Service function to fetch data from JSON
  */
  public getCitiesData(): Observable<Flights[]> {
    return this.http.get<Flights[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError('getCitiesData', []))
      );
  }

  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`HeroService : ${message}`);
  }

  /**
  * Filter the departure cities and arrival cities
  */
  public getCitiesList(flightData: any) {
    const allOriginCities: string[] = [];
    const allDestnCities: string[] = [];
    flightData.flights.map(x => {
      allOriginCities.push(x.departureCity);
      allDestnCities.push(x.arrivalCity);
    });
  /**
  * If the current index and the first indexof a city matches then populate it in new array.
  * This operation is perform to remove duplicates.
  */
    this.originCities = allOriginCities.filter((x, index, originalArr) => {
      return index === originalArr.indexOf(x);
    });
    this.destinationCities = allDestnCities.filter((x, index, originalArr) => {
      return index === originalArr.indexOf(x);
    });
  }

  /**
  * Search for availablity of flight from JSON data
  * @param searchParams;
  */
  public searchFlight(searchParams: BookingDetails): Flights[] {
    return this.getMatchingFlights(this.flightDetails, searchParams);
  }
  /**
   * Returns a new array of matching items based on search.
   * @param flightData;
   * @param searchParams;
   */
  public getMatchingFlights(flightData: any, searchParams: BookingDetails): Flights[] {
    const filteredItmes: Flights[] = [];
    this.dataFound = false;
    /* split the date and miliseconds into a new array and return the number of miliseconds between january 1, 1970 and the fetched date */
    flightData.flights.map((x) => {
      if (Date.parse(x.date.split(' ')[0]) === Date.parse(searchParams.departDate) && x.departureCity === searchParams.departureCity
        && x.arrivalCity === searchParams.arrivalCity) {
        this.dataFound = true;
        filteredItmes.push(x);
      }
    });
    return filteredItmes;
  }
}

