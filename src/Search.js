import React, { Component } from 'react';
import './Search.css';
import Tab from './Tab';
import Tabs from './Tabs';
import TrainList from './TrainList';

class Search extends Component {
  render() {
    return (
      <div className="Search">
        <div className="Search-box">
          <div className="Search-text">Hae aseman nimellä</div>
          <input type="search"
                 className="Search-input"
                 defaultValue="Tampere"
                 placeholder="Tampere" />
        </div>
        <Tabs>
          <Tab title="Saapuvat">
            <TrainList type="arrivals"/>
          </Tab>
          <Tab title="Lähtevät">
            <TrainList type="departures" />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Search;
