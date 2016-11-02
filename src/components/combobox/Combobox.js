import React, { Component } from 'react';
import './Combo.styl';

class Combobox extends Component {
  constructor(props) {
    super();

    this.state = {
      value: '',
      suggestions: props.suggestions,
      newSuggestions: props.suggestions,
      inputFocused: false,
      inputUpper: false
    };
  }

  handleChange = (event) => {
    const suggestions = this.state.suggestions;
    const newsuggestions = suggestions.filter( item =>
      item.toLowerCase().startsWith(event.target.value.toLowerCase())
    ).slice(0, 10);
    this.setState({
      value: event.target.value,
      newSuggestions: newsuggestions
    });
  }

  handleChoose = (value) => {
    this.setState({
      value: value,
      inputFocused: false,
      newSuggestions: []
    });
  }

  handleFocus = (event) => {
    this.textInput.focus();
    this.setState({
      inputFocused: true
    });
    const rect = this.textInput.getBoundingClientRect();
    const offsetBottom = window.innerHeight - rect.bottom;
    if (rect.top > offsetBottom) {
      this.setState({
        inputUpper: true
      });
    } else {
      this.setState({
        inputUpper: false
      });
    }
  }

  handleBlur = (event) => {
    this.setState({
      inputFocused: false
    });
  }

  renderDropdown = (suggestions) => {
    return (
      <div className={"b-combo-suggestions " + (this.state.inputFocused ? 'active' : '')}>
        {suggestions.map((item, index) => {
          const itemHighlight = item.slice(0, this.state.value.length);
          const itemEnd = item.slice(this.state.value.length);
          return (
            <div className="b-combo-item" key={index} onClick={() => this.handleChoose(item)}>
              <span className="b-combo-marked">{itemHighlight}</span>{itemEnd}
            </div>
          )
        })}
        <div onClick={() => this.handleChoose('')} className={"b-combo-item " + (suggestions.length === 0 ? '' : 'hidden')} >
          no suggestions, clear
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={"b-combo " + (this.state.inputUpper ? 'upper' : '')} onClick={this.handleFocus}>
        <input
          className="b-combo-input"
          ref={(input) => this.textInput = input}
          value={this.state.value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
      <div className={"b-combo-placeholder " + (this.state.value !== '' ? 'active' : '')}>
          {this.props.placeholder}
        </div>
        {this.renderDropdown(this.state.newSuggestions)}
      </div>
    );
  }
}

export default Combobox;
