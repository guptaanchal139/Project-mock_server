import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  refinedPrice: string = "700";
  display: boolean = false;
  fly: boolean = false;

  public setRefinedPrice(event) {
    this.refinedPrice = event;
  }

  public setDisplay(event) {
    this.display = event;
  }
  /**
   * Animation on book click
   */
  public updateFlying(fly: boolean) {
    this.fly = fly;
  }
}
