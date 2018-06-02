// The railway traffic API at https://rata.digitraffic.fi/.

class Rata {
  constructor(fetchFunction) {
    this.fetch = fetchFunction || window.fetch.bind(window);
    this.stations = null;
  }

  getStations() {
    if (this.stations === null) {
      this.stations = this.fetch(
        'https://rata.digitraffic.fi/api/v1/metadata/stations'
      ).then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      });
    }
    return this.stations;
  }

  getArrivals(stationCode) {
    const url = 'https://rata.digitraffic.fi/api/v1/live-trains/station/' + stationCode +
      '?arrived_trains=0&arriving_trains=10&departed_trains=0&departing_trains=0&include_nonstopping=false';
    return this.fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res;
      }
    });
  }

  getDepartures(stationCode) {
    const url = 'https://rata.digitraffic.fi/api/v1/live-trains/station/' + stationCode +
      '?arrived_trains=0&arriving_trains=0&departed_trains=0&departing_trains=10&include_nonstopping=false';
    return this.fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw res;
      }
    });
  }
}

export default Rata;
