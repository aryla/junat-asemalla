// Helper functions for station data returned by the API

class Stations {
  constructor(data) {
    this.nameToCode = {};
    this.codeToName = {};

    for (let i = 0; i < data.length; i++) {
      const { stationName, stationShortCode } = data[i];
      this.nameToCode[stationName] = stationShortCode;
      this.codeToName[stationShortCode] = stationName;
    }
  }

  getStationCode(stationName) {
    return this.nameToCode[stationName];
  }

  getStationName(stationCode) {
    return this.codeToName[stationCode];
  }

  getMatchingStations(stationNamePrefix, maxResults) {
    // TODO: Could use a trie structure for better performance.

    const names = Object.keys(this.nameToCode);

    let result = [];
    for (let i = 0; i < names.length && result.length < maxResults; i++) {
      if (names[i].startsWith(stationNamePrefix)) {
        result.push(names[i]);
      }
    }

    return result;
  }
}

export default Stations;
