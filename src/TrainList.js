import React, { Component } from 'react';
import './TrainList.css';

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
          <tr>
            <td>S 165</td>
            <td>Helsinki</td>
            <td>Tampere</td>
            <td><time>10:40</time></td>
          </tr>
          <tr>
            <td>IC 20</td>
            <td>Oulu</td>
            <td>Helsinki</td>
            <td><time>10:00</time></td>
          </tr>
          <tr>
            <td>P 635</td>
            <td>Helsinki</td>
            <td>Jyväskylä</td>
            <td><time>10:24</time></td>
          </tr>
          <tr>
            <td>Commuter train R</td>
            <td>Helsinki</td>
            <td>Tampere</td>
            <td><time>10:25</time></td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default TrainList;
