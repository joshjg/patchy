import React from 'react';
import AudioContext from '../../AudioContext';

class Oscillator extends React.Component {
  static propTypes = {
    children: React.PropTypes.element,
    frequency: React.PropTypes.number.isRequired,
    detune: React.PropTypes.number,
    type: React.PropTypes.string,
    attack: React.PropTypes.number,
    decay: React.PropTypes.number,
    sustain: React.PropTypes.number,
    release: React.PropTypes.number,
  };
  static defaultProps = {
    detune: 0,
    type: 'sine',
    attack: 0.05,
    decay: 0.05,
    sustain: 0.5,
    release: 0.1,
  };
  static childContextTypes = {
    audioNode: React.PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.oscNode = AudioContext.createOscillator();
    this.audioNode = AudioContext.createGain();
    this.audioNode.gain.setValueAtTime(0.0001, AudioContext.currentTime);
    this.oscNode.connect(this.audioNode);
    this.oscNode.type = this.props.type;
  }
  getChildContext = () => ({ audioNode: this.audioNode });
  componentDidMount() {
    this.oscNode.start();
    this.audioNode.gain.exponentialRampToValueAtTime(
      1,
      AudioContext.currentTime + this.props.attack
    );
    this.audioNode.gain.exponentialRampToValueAtTime(
      this.props.sustain,
      AudioContext.currentTime + this.props.attack + this.props.decay
    );
    if (!React.Children.count(this.props.children)) {
      this.audioNode.connect(AudioContext.destination);
    }
  }
  componentWillUnmount() {
    this.audioNode.gain.exponentialRampToValueAtTime(
      0.0001,
      AudioContext.currentTime + this.props.release
    );
    this.oscNode.stop(AudioContext.currentTime + this.props.release);
  }
  render = () => {
    this.oscNode.frequency.value = this.props.frequency;
    this.oscNode.detune.value = this.props.detune;
    return (
      <div>
        {this.props.children}
      </div>
    );
  };
}

export default Oscillator;
