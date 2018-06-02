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

              const renderTime = (time) => {
                const date = new Date(time);
                const currentDate = new Date();

                return (
                  <time title={date.toLocaleString()}>
                    {
                      currentDate.getDate() !== date.getDate()
                        ? date.toLocaleString()
                        : date.toLocaleTimeString()
                    }
                  </time>
                );
              };

              return (
                <tr key={index} className={train.isCancelled() ? 'TrainList-cancelled' : ''}>
                  <td>{train.getTrainName()}</td>
                  <td>{this.props.stations.getStationName(train.getFirstStationCode())}</td>
                  <td>{this.props.stations.getStationName(train.getLastStationCode())}</td>
                  <td>{(() => {
                    if (train.isCancelled()) {
                      return (
                        <div>
                          <div>{renderTime(time.scheduled)}</div>
                          <div className="TrainList-late">Cancelled</div>
                        </div>
                      );
                    } else if (time.actual === time.scheduled) {
                      return <div>{renderTime(time.scheduled)}</div>;
                    } else {
                      return (
                        <div>
                          <div className="TrainList-late">{renderTime(time.actual)}</div>
                          <div>({renderTime(time.scheduled)})</div>
                        </div>
                      );
                    }
                  })()}</td>
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
