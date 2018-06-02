// Helper functions for train data returned by the API
class Train {
  constructor(data) {
    this.data = data;
  }

  isCancelled() {
    return this.data.cancelled;
  }

  getTrainName() {
    return this.data.trainType + ' ' + this.data.trainNumber;
  }

  getFirstStationCode() {
    return this.data.timeTableRows[0].stationShortCode;
  }

  getLastStationCode() {
    let row = this.data.timeTableRows[this.data.timeTableRows.length - 1];
    return row.stationShortCode;
  }

  getTimeAt(stationCode, type) {
    for (let i = 0; i < this.data.timeTableRows.length; i++) {
      const row = this.data.timeTableRows[i];
      if (row.stationShortCode === stationCode && row.type === type) {
        return {
          actual:    row.actualTime || row.liveEstimateTime,
          scheduled: row.scheduledTime,
        };
      }
    }
  }

  getTimeOfArrivalAt(stationCode) {
    return this.getTimeAt(stationCode, 'ARRIVAL');
  }

  getTimeOfDepartureFrom(stationCode) {
    return this.getTimeAt(stationCode, 'DEPARTURE');
  }
}

export default Train;
