import React, { Component } from 'react';
import './SearchInput.css';

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  onInputChange() {
    this.props.onSearch(this.inputRef.current.value);
  }

  render() {
    return (
      <div className="SearchInput-box">
        <div className="SearchInput-text">Hae aseman nimellä</div>
        <input type="search"
               className="SearchInput-input"
               defaultValue={this.props.defaultValue}
               placeholder={this.props.defaultValue}
               ref={this.inputRef}
               onChange={this.onInputChange.bind(this)} />
      </div>
    );
  }
}

export default SearchInput;
