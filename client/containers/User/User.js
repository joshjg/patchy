import React from 'react';
import { connect } from 'react-redux';
import { toggleMuteUser } from './actions';
import volumeUp from '../../assets/volume_up.svg';
import volumeOff from '../../assets/volume_off.svg';

const User = ({ id, self, muted, listener, toggle, ...others }) => (
  <div {...others}>
    {(!self && !listener) &&
      <img
        alt="toggle mute"
        src={muted ? volumeOff : volumeUp}
        height={20}
        style={{
          display: 'inline',
          position: 'relative',
          float: 'left',
          marginLeft: '6px',
          marginRight: '-30px',
          marginTop: '-2px',
        }}
        onClick={() => toggle(muted)}
      />
    }
    {id}{self ? ' (You)' : ''}{listener ? ' (Listener)' : ''}
  </div>
);

User.propTypes = {
  id: React.PropTypes.string.isRequired,
  self: React.PropTypes.bool,
  muted: React.PropTypes.bool,
  listener: React.PropTypes.bool,
  toggle: React.PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
  self: state.root.id === ownProps.id,
  muted: state.root.mutedUsers.indexOf(ownProps.id) !== -1,
  listener: state.root.users.indexOf(ownProps.id) >= 4,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  toggle: muted => dispatch(toggleMuteUser(ownProps.id, muted)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
