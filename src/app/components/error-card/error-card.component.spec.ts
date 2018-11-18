import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorCardComponent } from './error-card.component';

describe('ErrorCardComponent', () => {
  let component: ErrorCardComponent;
  let fixture: ComponentFixture<ErrorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ErrorCard component', () => {
    expect(component).toBeTruthy();
  });

  it('should render no flights found text in h1 tag', () => {
    const fixture = TestBed.createComponent(ErrorCardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Oops! No Flights Found.Please try to make a different selection.');
  });
});
