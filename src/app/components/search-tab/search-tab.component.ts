import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { BookingDetails } from '../../interfaces/bookingDetails';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.component.html',
  styleUrls: ['./search-tab.component.css']
})
export class SearchTabComponent implements OnInit {

  @Output() refinedPriceOutput: EventEmitter<number> = new EventEmitter<number>();
  @Output() submitOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Page variables
   */
  public invalidForm: boolean = false;
  public sameCity: boolean = false;
  public isSubmitted: boolean = false;
  public refinePrice: number = 700;
  constructor(public _searchService: SearchService) { }

  ngOnInit() {
    this.refinedPriceOutput.emit(this.refinePrice);
    /**
     * Get all the cities available on initialization of component.
     */
    this._searchService.getCitiesData().subscribe(flightDetails => {
      this._searchService.flightDetails = flightDetails,
      this._searchService.getCitiesList(this._searchService.flightDetails)
    }
    );
    this._searchService.details = {
      departureCity: 'select', arrivalCity: 'select', departDate: '', returnDate: '', oneWay: true, passengersCount: 1
    }
  }
  /**
   * select the trip type- oneWay or twoWay
   */
  public tripType() {
    this._searchService.details.oneWay = !this._searchService.details.oneWay;
    /* to hide price refine, display container, flight-info-box */
    this._searchService.dataFound = false;  
    /* to hide/show image and display container */      
    this.submitOutput.emit(false);                    
  }
  /**
   * Check validation of form and proceed for search
   * @param formInputs 
   */
  public onSubmit(formInputs): void {
    if (formInputs.form.valid && this._searchService.details.departureCity !== this._searchService.details.arrivalCity) {
      this.invalidForm = false;
      this.sameCity = false;
      this.isSubmitted = true;
      this.performSearch();
      this.submitOutput.emit(true);
    }
    else
      if (this._searchService.details.departureCity === this._searchService.details.arrivalCity && this._searchService.details.departureCity !== 'select')
        this.sameCity = true;
      else
        this.invalidForm = true;

  }
  /**
   * Search for flights based on input provided.
   */
  public performSearch(): void {
    if (this._searchService.details.oneWay)
      this._searchService.oneWayFlights = this._searchService.searchFlight(this._searchService.details);

    else {
      this._searchService.oneWayFlights = this._searchService.searchFlight(this._searchService.details);
      let twoWayDetails: BookingDetails = {
        departureCity: this._searchService.details.arrivalCity,
        arrivalCity: this._searchService.details.departureCity,
        departDate: this._searchService.details.returnDate,
        returnDate: '',
        oneWay: false, passengersCount: this._searchService.details.passengersCount
      }
      this._searchService.twoWayFlights = this._searchService.searchFlight(twoWayDetails);
    }
  }
  /**
   * On change of slider event
   * autmatically detect flights in range
   * @param event 
   */
  sliderChangeEvent(event) {
    this.refinedPriceOutput.emit(this.refinePrice);
  }

}
