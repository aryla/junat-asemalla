import Rata from './Rata';

// Test data.
const stations = [
  {
    stationName: 'Kemi',
    stationShortCode: 'KEM',
  },
  {
    stationName: 'Porvoo',
    stationShortCode: 'PRV',
  },
];

const trains = [
  {
    cancelled: false,
    trainType: 'IC',
    trainNumber: 123,
  },
];

// Stub for the fetch function.
const fetch = ((url) => {
  if (url.startsWith('https://rata.digitraffic.fi/api/v1/metadata/stations')) {
    return Promise.resolve({
      status: 200,
      ok: true,
      json: () => stations,
    });
  } else {
    return Promise.resolve({
      status: 200,
      ok: true,
      json: () => trains,
    });
  }
});

it('can fetch stations', () => {
  const rata = new Rata(fetch);
  return expect(rata.getStations()).resolves.toBe(stations);
});

it('can fetch arrivals by station code', () => {
  const rata = new Rata(fetch);
  return expect(rata.getArrivals('TRE')).resolves.toBe(trains);
});

it('can fetch departures by station code', () => {
  const rata = new Rata(fetch);
  return expect(rata.getArrivals('HKI')).resolves.toBe(trains);
});
