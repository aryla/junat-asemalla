import React, { Component } from 'react';
import './TrainList.css';
import Train from './Train';

class TrainList extends Component {
  render() {
    return (
      <table className="TrainList">
        <thead className="TrainList">
          <tr>
            <th>Juna</th>
            <th>Lähtöasema</th>
            <th>Pääteasema</th>
            <th>
              {this.props.type === 'arrivals' ? 'Saapuu' : 'Lähtee'}
            </th>
          </tr>
        </thead>
        <tbody className="TrainList">
          {
            this.props.trains.map((trainData, index) => {
              const train = new Train(trainData);

              let time;
              if (this.props.type === 'arrivals') {
                time = train.getTimeOfArrivalAt(this.props.station);
              } else {
                time = train.getTimeOfDepartureFrom(this.props.station);
              }

              const estimateTime  = time.actual || time.scheduled;

              return (
                <tr key={index}>
                  <td>{train.getTrainName()}</td>
                  <td>{this.props.stations.getStationName(train.getFirstStationCode())}</td>
                  <td>{this.props.stations.getStationName(train.getLastStationCode())}</td>
                  <td>{estimateTime}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

export default TrainList;
