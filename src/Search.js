import React, { Component } from 'react';
import './Search.css';
import Rata from './Rata';
import SearchInput from './SearchInput';
import Stations from './Stations';
import Tab from './Tab';
import Tabs from './Tabs';
import Train from './Train';
import TrainList from './TrainList';

class Search extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.rata = new Rata();
    this.getStations = null;

    this.state = {
      // Station code of the searched station.
      stationCode: null,
      arrivals: [],
      departures: [],
      stations: null,
    };
  }

  componentDidMount() {
    this.getStations = this.rata.getStations().then((data) => new Stations(data));
    this.getStations.then((stations) => {
      this.setState({
        stations: stations,
      });
    });
    this.doSearch();
  }

  doSearch() {
    const stationName = this.inputRef.current.value;

    this.getStations.then((stations) => {
      const code = this.state.stations.getStationCode(stationName);
      if (!code) return;

      this.setState({
        stationCode: code,
      });

      this.rata.getArrivals(code).then((trains) => {
        trains = trains.sort((a, b) => {
          const trainA = new Train(a);
          const trainB = new Train(b);
          return new Date(trainA.getTimeOfArrivalAt(code).scheduled).getTime() -
                 new Date(trainB.getTimeOfArrivalAt(code).scheduled).getTime();
        });
        this.setState({
          arrivals: trains,
        });
      });

      this.rata.getDepartures(code).then((trains) => {
        trains = trains.sort((a, b) => {
          const trainA = new Train(a);
          const trainB = new Train(b);
          return new Date(trainA.getTimeOfDepartureFrom(code).scheduled).getTime() -
                 new Date(trainB.getTimeOfDepartureFrom(code).scheduled).getTime();
        });
        this.setState({
          departures: trains,
        });
      });
    });
  }

  render() {
    return (
      <div className="Search">
        <div className="Search-box">
          <div className="Search-text">Hae aseman nimellä</div>
          <input type="search"
                 className="Search-input"
                 defaultValue="Tampere asema"
                 placeholder="Tampere asema"
                 ref={this.inputRef}
                 onChange={this.doSearch.bind(this)} />
        </div>
        <Tabs>
          <Tab title="Saapuvat">
            <TrainList type="arrivals"
                       trains={this.state.arrivals}
                       station={this.state.stationCode}
                       stations={this.state.stations} />
          </Tab>
          <Tab title="Lähtevät">
            <TrainList type="departures"
                       trains={this.state.departures}
                       station={this.state.stationCode}
                       stations={this.state.stations} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Search;
