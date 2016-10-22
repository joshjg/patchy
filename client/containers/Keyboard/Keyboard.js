import React from 'react';
import { connect } from 'react-redux';

import Key from '../../components/Key';

import styles from './Keyboard.css';
import { addTouch, updateTouch, removeTouch } from './actions';

class Keyboard extends React.Component {
  static propTypes = {
    targets: React.PropTypes.objectOf(React.PropTypes.array),
    addTouch: React.PropTypes.func,
    updateTouch: React.PropTypes.func,
    removeTouch: React.PropTypes.func,
  };

  componentDidMount = () => {
    document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    document.addEventListener('touchend', this.handleTouchEnd);
    document.addEventListener('touchcancel', this.handleTouchEnd);
  };

  componentWillUnmount = () => {
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('touchcancel', this.handleTouchEnd);
  };

  handleTouchStart = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      this.props.addTouch(e.changedTouches[i].identifier, e.target.dataset.keyCode);
    } // TODO ensure multiple touches have same target
  };

  handleTouchMove = (e) => {
    if (e.target.dataset.keyCode) {
      e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target && target.dataset.keyCode) {
          this.props.updateTouch(touch.identifier, target.dataset.keyCode);
        } else {
          this.props.removeTouch(touch.identifier);
        }
      }
    }
  };

  handleTouchEnd = (e) => {
    if (e.target.dataset.keyCode) {
      const changedTouch = e.changedTouches[0];
      const target = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
      if (target && target.dataset.keyCode) {
        this.props.removeTouch(changedTouch.identifier);
      }
    }
  };

  // here I avoid passing the entire target list to Key as a prop at the expense of tersity
  render = () => (
    <div
      className={styles.root}
      onTouchStart={this.handleTouchStart}
    >
      <Key keyCode="65" active={!!this.props.targets[65].length}>
        <Key minor keyCode="87" active={!!this.props.targets[87].length} />
      </Key>
      <Key keyCode="83" active={!!this.props.targets[83].length}>
        <Key minor keyCode="69" active={!!this.props.targets[69].length} />
      </Key>
      <Key keyCode="68" active={!!this.props.targets[68].length} />
      <Key keyCode="70" active={!!this.props.targets[70].length}>
        <Key minor keyCode="84" active={!!this.props.targets[84].length} />
      </Key>
      <Key keyCode="71" active={!!this.props.targets[71].length}>
        <Key minor keyCode="89" active={!!this.props.targets[89].length} />
      </Key>
      <Key keyCode="72" active={!!this.props.targets[72].length}>
        <Key minor keyCode="85" active={!!this.props.targets[85].length} />
      </Key>
      <Key keyCode="74" active={!!this.props.targets[74].length} />
      <Key keyCode="75" active={!!this.props.targets[75].length}>
        <Key minor keyCode="79" active={!!this.props.targets[79].length} />
      </Key>
      <Key keyCode="76" active={!!this.props.targets[76].length}>
        <Key minor keyCode="80" active={!!this.props.targets[80].length} />
      </Key>
      <Key keyCode="186" active={!!this.props.targets[186].length} />
      <Key keyCode="222" active={!!this.props.targets[222].length} />
    </div>
  );
}

const mapStateToProps = state => ({
  targets: state.keyboard.targets,
});

const mapDispatchToProps = dispatch => ({
  addTouch: (touchId, targetId) => dispatch(addTouch(touchId, targetId)),
  updateTouch: (touchId, targetId) => dispatch(updateTouch(touchId, targetId)),
  removeTouch: (touchId, targetId) => dispatch(removeTouch(touchId, targetId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Keyboard);
