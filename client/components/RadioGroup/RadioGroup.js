/* eslint-disable react/no-unused-prop-types */

import React from 'react';
import cssModule from 'react-css-modules';
import styles from './RadioGroup.css';

const RadioGroup = props => (
  <div styleName="root" style={props.style}>
    {Object.keys(props.options).map(opt => (
      <label
        key={props.options[opt]}
        styleName={props.value === opt ? 'selected' : 'option'}
        style={props.value === opt ? { backgroundColor: props.activeColor } : {}}
      >
        <input
          type="radio"
          styleName="radio"
          value={opt}
          checked={props.value === opt}
          onChange={props.onChange}
        />
        {props.options[opt]}
      </label>
    ))}
    {props.label ? <div styleName="label">{props.label}</div> : null}
  </div>
);

RadioGroup.propTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  options: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  activeColor: React.PropTypes.string,
  style: React.PropTypes.object,
};

RadioGroup.defaultProps = {
  label: '',
  activeColor: '#EA2',
};

export default cssModule(RadioGroup, styles);
