import React, { Component } from 'react';
import './SearchInput.css';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      suggestions: [],
      showSuggestions: false,
    };
  }

  onInputChange() {
    const stationName = this.inputRef.current.value;
    const stationCode = this.props.stations.getStationCode(stationName);
    if (stationCode !== undefined) {
      this.props.onSearch(this.inputRef.current.value);
    } else {
      this.setState({
        suggestions: this.props.stations.getMatchingStations(stationName, 10),
        showSuggestions: true,
      });
    }
  }

  onSuggestionSelected(stationName) {
    this.inputRef.current.value = stationName;
    this.onInputChange();
    this.setState({
      showSuggestions: false,
    });
  }

  onBlur() {
    // Set a timeout for hiding the suggestion list so that it's not hidden
    // before the onclick handler runs when the user clicks a suggestion.
    window.setTimeout(() => {
      this.setState({
        showSuggestions: false,
      });
    }, 200);
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
                 onChange={this.onInputChange.bind(this)}
                 onFocus={this.onInputChange.bind(this)}
                 onBlur={this.onBlur.bind(this)} />
          <ul className={this.state.showSuggestions
                          ? 'SearchInput-suggestions'
                          : 'SearchInput-suggestions SearchInput-invisible'}>
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
