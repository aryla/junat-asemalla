import React, { Component } from 'react';
import './Tabs.css';

class Tabs extends Component {
  constructor() {
    super();
    this.state = {
      selected: 0
    };
  }

  changeTab(index, event) {
    event.preventDefault();
    this.setState({
      selected: index
    });
  }

  render() {
    return (
      <div className="Tabs">
        <ul className="Tabs-bar">
        {
          this.props.children.map((child, index) =>
            <li key={index}
                className={index === this.state.selected ? 'Tabs-button-selected' :  'Tabs-button'}>
              <a onClick={this.changeTab.bind(this, index)}>
                 {child.props.title}
              </a>
            </li>
          )
        }
        </ul>
        <div className="Tabs-content">
          {this.props.children[this.state.selected]}
        </div>
      </div>
    );
  }
}

export default Tabs;
