import React from 'react';
import cssModule from 'react-css-modules';
import styles from './Key.css';

const Key = ({ children, active, minor, keyCode }) => (
  <div
    styleName={minor // eslint-disable-line no-nested-ternary
      ? (active ? 'activeMinor' : 'minor')
      : (active ? 'activeMajor' : 'major')
    }
    data-key-code={keyCode}
  >
    {children}
  </div>
);

Key.propTypes = {
  children: React.PropTypes.node,
  active: React.PropTypes.bool,
  minor: React.PropTypes.bool,
  keyCode: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
};

Key.defaultProps = {
  minor: false,
};

export default cssModule(Key, styles);
