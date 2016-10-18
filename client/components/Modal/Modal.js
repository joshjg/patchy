import React from 'react';
import cssModule from 'react-css-modules';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import styles from './Modal.css';

const Modal = ({ onClickRemove, children }) => (
  <ReactCSSTransitionGroup
    transitionName={{
      appear: styles.appear,
      appearActive: styles.appearActive,
    }}
    transitionAppear
    transitionAppearTimeout={150}
    transitionEnterTimeout={150}
    transitionLeaveTimeout={150}
  >
    <div styleName="root" onClick={onClickRemove}>
      <div styleName="dimmer" />
      <div styleName="modal" onClick={e => e.stopPropagation()}>
        <div styleName="button" onClick={onClickRemove}>&times;</div>
        {children}
      </div>
    </div>
  </ReactCSSTransitionGroup>
);

Modal.propTypes = {
  onClickRemove: React.PropTypes.func,
  children: React.PropTypes.node,
};

export default cssModule(Modal, styles);
