import React from 'react';
import Knob from 'react-canvas-knob';
import cssModule from 'react-css-modules';
import styles from './ParamKnob.css';

const ParamKnob = (props) => {
  const {
    param,
    target,
    targetId,
    onChange,
    toFixed,
    ...others,
  } = props;
  return (
    <div styleName="root">
      <Knob
        width={125}
        angleArc={300}
        angleOffset={210}
        bgColor="#DDD"
        font="Futura, Arial"
        {...others}
        value={target[param]}
        onChange={value => onChange(
          targetId,
          param,
          toFixed < 0 ? value : +value.toFixed(toFixed)
        )}
      />
      <div styleName="label">{param}</div>
    </div>
  );
};

ParamKnob.propTypes = {
  param: React.PropTypes.string.isRequired,
  target: React.PropTypes.object.isRequired,
  targetId: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  toFixed: React.PropTypes.number,
};

ParamKnob.defaultProps = {
  toFixed: -1,
};

export default cssModule(ParamKnob, styles);
