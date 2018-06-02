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
}

export default Stations;
