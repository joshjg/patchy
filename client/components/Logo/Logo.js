import React from 'react';
import cssModule from 'react-css-modules';
import styles from './Logo.css';
import logo from '../../assets/logo.svg';

const Logo = () => (
  <a href="/" styleName="root">
    <img alt="logo" src={logo} styleName="logo" />
  </a>
);

Logo.propTypes = {

};

export default cssModule(Logo, styles);
