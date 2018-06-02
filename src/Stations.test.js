import Stations from './Stations';

// Test data.
const testData = [
  {
    type: 'STATION',
    stationName: 'Kemi',
    stationShortCode: 'KEM',
  },
  {
    type: 'STATION',
    stationName: 'Porvoo',
    stationShortCode: 'PRV',
  },
];


it('can find station by name', () => {
  const stations = new Stations(testData);
  return expect(stations.getStationCode('Kemi')).toBe('KEM');
});

it('does not find non-existent stations names', () => {
  const stations = new Stations(testData);
  return expect(stations.getStationCode('Nowhere')).toBe(undefined);
});

it('can find station by code', () => {
  const stations = new Stations(testData);
  return expect(stations.getStationName('PRV')).toBe('Porvoo');
});

it('does not find non-existent station codes', () => {
  const stations = new Stations(testData);
  return expect(stations.getStationName('???')).toBe(undefined);
});
