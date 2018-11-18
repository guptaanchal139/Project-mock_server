import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  it('sort the flight array based on price', () => {
    const pipe = new OrderByPipe();
    const mockFlightDetails = [
      {
        flightNo: "BM-715",
        departureCity: "brisbane",
        arrivalCity: "melbourne",
        time: {
          depart: "2018-11-28 18:20:00",
          arrive: "2018-11-28 20:40:00"
        },
        date: "2018-11-28 18:20:00",
        amount: "230.00"
      },
      {
        flightNo: "MA-503",
        departureCity: "melbourne",
        arrivalCity: "adelaide",
        time: {
          depart: "2018-11-27 11:00:00",
          arrive: "2018-11-27 12:20:00"
        },
        date: "2018-11-27 03:30:00",
        amount: "120.00"
      },
      {
        flightNo: "MB-116",
        departureCity: "melbourne",
        arrivalCity: "brisbane",
        time: {
          depart: "2018-11-28 15:00:00",
          arrive: "2018-11-28 17:30:00"
        },
        date: "2018-11-28 15:00:00",
        amount: "420.00"
      },
      {
        flightNo: "MB-115",
        departureCity: "melbourne",
        arrivalCity: "brisbane",
        time: {
          depart: "2018-11-28 19:40:00",
          arrive: "2018-11-28 22:00:00"
        },
        date: "2018-11-28 19:40:00",
        amount: "300.00"
      }
    ];

    const mockFlightList = [
      {
        flightNo: "MA-503",
        departureCity: "melbourne",
        arrivalCity: "adelaide",
        time: {
          depart: "2018-11-27 11:00:00",
          arrive: "2018-11-27 12:20:00"
        },
        date: "2018-11-27 03:30:00",
        amount: "120.00"
      },
      {
        flightNo: "BM-715",
        departureCity: "brisbane",
        arrivalCity: "melbourne",
        time: {
          depart: "2018-11-28 18:20:00",
          arrive: "2018-11-28 20:40:00"
        },
        date: "2018-11-28 18:20:00",
        amount: "230.00"
      },
      {
        flightNo: "MB-115",
        departureCity: "melbourne",
        arrivalCity: "brisbane",
        time: {
          depart: "2018-11-28 19:40:00",
          arrive: "2018-11-28 22:00:00"
        },
        date: "2018-11-28 19:40:00",
        amount: "300.00"
      },
      {
        flightNo: "MB-116",
        departureCity: "melbourne",
        arrivalCity: "brisbane",
        time: {
          depart: "2018-11-28 15:00:00",
          arrive: "2018-11-28 17:30:00"
        },
        date: "2018-11-28 15:00:00",
        amount: "420.00"
      }
    ];
    expect(pipe.transform(mockFlightDetails)).toEqual(mockFlightList);
  });
});
