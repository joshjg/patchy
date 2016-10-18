import React from 'react';
import cssModule from 'react-css-modules';
import styles from './ButtonGroup.css';

const ButtonGroup = ({ children, style }) => (
  <div styleName="root" style={style}>
    {children}
  </div>
);

ButtonGroup.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object,
};

export default cssModule(ButtonGroup, styles);
