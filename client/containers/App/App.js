import React from 'react';
import { connect } from 'react-redux';

const App = props => (
  <div>
    {props.children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node.isRequired,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
