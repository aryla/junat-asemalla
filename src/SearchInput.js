import React, { Component } from 'react';
import './SearchInput.css';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      suggestions: [],
    };
  }

  onInputChange() {
    const stationName = this.inputRef.current.value;
    const stationCode = this.props.stations.getStationCode(stationName);
    if (stationCode !== undefined) {
      this.props.onSearch(this.inputRef.current.value);
      this.setState({
        suggestions: [],
      });
    } else {
      this.setState({
        suggestions: this.props.stations.getMatchingStations(stationName, 10),
      });
    }
  }

  onSuggestionSelected(stationName) {
    this.inputRef.current.value = stationName;
    this.onInputChange();
  }

  render() {
    return (
      <div className="SearchInput-container">
        <div className="SearchInput-text">Hae aseman nimellä</div>
        <div className="SearchInput-field">
          <input type="search"
                 className="SearchInput-input"
                 defaultValue={this.props.defaultValue}
                 placeholder={this.props.defaultValue}
                 ref={this.inputRef}
                 onChange={this.onInputChange.bind(this)} />
          <ul className="SearchInput-suggestions">
            {
              this.state.suggestions.map((stationName, index) => (
                <li key={index}
                    className="SearchInput-suggestion"
                    onClick={this.onSuggestionSelected.bind(this, stationName)}>
                  {stationName}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchInput;
