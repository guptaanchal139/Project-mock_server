import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAdsComponent } from './image-ads.component';

describe('ImageAdsComponent', () => {
  let component: ImageAdsComponent;
  let fixture: ComponentFixture<ImageAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Image component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a div component with class inner-container`, () => {
    const fixture = TestBed.createComponent(ImageAdsComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.inner-container')).toBeTruthy();
  });

});
