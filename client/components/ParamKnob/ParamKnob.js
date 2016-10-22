import React from 'react';
import Knob from 'react-canvas-knob';
import cssModule from 'react-css-modules';
import MediaQuery from 'react-responsive';
import styles from './ParamKnob.css';

const ParamKnob = (props) => {
  const {
    param,
    target,
    targetId,
    onChange,
    toFixed,
    small,
    ...others
  } = props;
  return (
    <div styleName="root">
      <MediaQuery minWidth={750}>
        <Knob
          width={small ? 100 : 125}
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
      </MediaQuery>
      <MediaQuery maxWidth={749}>
        <Knob
          width={small ? 75 : 100}
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
          disableTextInput
        />
      </MediaQuery>
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
  small: React.PropTypes.bool,
};

ParamKnob.defaultProps = {
  toFixed: -1,
  small: false,
};

export default cssModule(ParamKnob, styles);
