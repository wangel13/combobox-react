import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setText, clearText } from '../../actions';
import { mobileAndTabletcheck } from '../../utils'
import './Combo.styl';

let createHandlers = function(dispatch) {
  let onSetText = function(data) {
    dispatch(setText(data))
  };

  let onClearText = function() {
    dispatch(clearText())
  };

  return {
    onSetText,
    onClearText
  };
}

class Combobox extends Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);

    this.state = {
      value: '',
      suggestions: props.suggestions,
      newSuggestions: props.suggestions,
      inputFocused: false,
      inputUpper: false,
      isMobile: mobileAndTabletcheck()
    };
  }

  handleChange = (event) => {
    const suggestions = this.state.suggestions;
    const newsuggestions = suggestions.filter( item =>
      item.toLowerCase().startsWith(event.target.value.toLowerCase())
    ).slice(0, 10);
    this.handlers.onSetText(event.target.value);
    this.setState({
      value: event.target.value,
      newSuggestions: newsuggestions
    });
  }

  handleChoose = (value) => {
    if (value === '') {
      this.handlers.onClearText();
    } else {
      this.handlers.onSetText(value);
    }
    this.setState({
      value: value,
      inputFocused: false,
      newSuggestions: []
    });
  }

  handleChooseMobile = (value) => {
    this.handlers.onSetText(value);
    this.setState({
      value: value,
      inputFocused: false
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

  renderDropdownMobile = (suggestions) => {
    return (
      <select
        className="b-combo-input b-combo-input--select"
        ref={(select) => this.selectInput = select}
        value={this.state.value}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={(e) => this.handleChooseMobile(e.target.value)}
      >
        {suggestions.map((item, index) => {
          return (
            <option key={index}>
              {item}
            </option>
          )
        })}
        <option onClick={() => this.handleChoose('')} selected >
        </option>
      </select>
    )
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
    if(this.state.isMobile) {
      return (
        <div className={"b-combo " + (this.state.inputUpper ? 'upper' : '')} onClick={this.handleFocus}>
          {this.renderDropdownMobile(this.state.newSuggestions)}
          <div className={"b-combo-placeholder " + (this.state.value !== '' ? 'active' : '')}>
            {this.props.placeholder}
          </div>
        </div>
      )
    }
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
    )
  }
}

export default connect()(Combobox);
