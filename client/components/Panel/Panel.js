import React from 'react';
import cssModule from 'react-css-modules';
import styles from './Panel.css';

const Panel = ({ label, removable, onClickRemove, height, children }) => (
  <div styleName="root" style={{ minHeight: `${height}px` }}>
    <div styleName="label">
      {removable && <div styleName="button" onClick={onClickRemove}>&times;</div>}
      {label}
    </div>
    {children}
  </div>
);

Panel.propTypes = {
  label: React.PropTypes.string,
  removable: React.PropTypes.bool,
  onClickRemove: React.PropTypes.func,
  height: React.PropTypes.number,
  children: React.PropTypes.node,
};

Panel.defaultProps = {
  removable: true,
  height: 150,
};

export default cssModule(Panel, styles);
