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
    stationName: 'Kemijärvi',
    stationShortCode: 'KJÄ',
  },
  {
    type: 'STATION',
    stationName: 'Porvoo',
    stationShortCode: 'PRV',
  },
];


it('can find station by name', () => {
  const stations = new Stations(testData);
  expect(stations.getStationCode('Kemi')).toBe('KEM');
});

it('does not find non-existent stations names', () => {
  const stations = new Stations(testData);
  expect(stations.getStationCode('Nowhere')).toBe(undefined);
});

it('can find station by code', () => {
  const stations = new Stations(testData);
  expect(stations.getStationName('PRV')).toBe('Porvoo');
});

it('does not find non-existent station codes', () => {
  const stations = new Stations(testData);
  expect(stations.getStationName('???')).toBe(undefined);
});

it('finds matching station names', () => {
  const stations = new Stations(testData);
  const result = stations.getMatchingStations('Ke', 10);
  expect(result).toContain('Kemi');
  expect(result).toContain('Kemijärvi');
  expect(result).toHaveLength(2);
});

it('limits number of matching stations', () => {
  const stations = new Stations(testData);
  expect(stations.getMatchingStations('Ke', 1)).toHaveLength(1);
});
