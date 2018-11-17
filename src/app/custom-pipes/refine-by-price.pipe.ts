import { Pipe, PipeTransform } from '@angular/core';
import { Flights } from '../interfaces/flightDetails';

/**
 * Shows refined flight results based on the price.
 * Takes price limit as argument.
 */
@Pipe({ name: 'refineSearch' })
export class RefineByPricePipe implements PipeTransform {
    transform(value: Flights[], price: string) {
        if (price == null)
            price = "700"
        let newValues: Flights[] = [];
        if (value != null) {
            for (let entry of value) {

                if (entry.amount.valueOf() <= price.valueOf())
                    newValues.push(entry);
            }
            return newValues;
        }
    }
}