import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SearchTabComponent } from './search-tab.component';
import { SearchService } from '../../services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

describe('SearchTabComponent', () => {
  let component: SearchTabComponent;
  let fixture: ComponentFixture<SearchTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTabComponent ],
      providers: [SearchService],
      imports: [HttpClientModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create SearchTab component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a div element with class tab`, async(() => {
    const fixture = TestBed.createComponent(SearchTabComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.tab')).toBeTruthy();
  }));

  it(`should have a form element`, async(() => {
    const fixture = TestBed.createComponent(SearchTabComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  }));

  it('should display the validation message as Please select a valid input', async(() => {
    const select = fixture.debugElement.query(By.css('#departureCity')).nativeElement;
    select.value = select.options[0].value;  // <-- select incorrect value
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('sub').textContent).toContain('Please select a valid input');

  }));

  it('should display the validation message as Departure city and Arrival city cannot be same', async(() => {
    component._searchService.originCities = ['melbourne','sydney'];
    component._searchService.destinationCities = ['perth','melbourne'];
    fixture.detectChanges();
    const selectDepCity = fixture.debugElement.query(By.css('#departureCity')).nativeElement;
    selectDepCity.value = selectDepCity.options[1].value;  // <-- select value of derparture city
    selectDepCity.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const selectArrCity = fixture.debugElement.query(By.css('#arrivalCity')).nativeElement;
    selectArrCity.value = selectArrCity.options[2].value;  // <-- select value of arrival city
    selectArrCity.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const date = fixture.debugElement.query(By.css('#departDate')).nativeElement;
    date.value = '2018-04-11';  // <-- select value of arrival city
    date.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    const click = fixture.debugElement.query(By.css('input[type = submit]')).nativeElement;
    click.click()

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('sub').textContent).toContain('Departure city and Arrival city cannot be same');

  }));

});
