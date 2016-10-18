import React from 'react';
import AudioContext from '../../AudioContext';

class Filter extends React.Component {
  static propTypes = {
    type: React.PropTypes.string,
    frequency: React.PropTypes.number,
    Q: React.PropTypes.number,
    detune: React.PropTypes.number,
    gain: React.PropTypes.number,
    children: React.PropTypes.element,
  };
  static defaultProps = {
    type: 'lowpass',
    frequency: 1000,
    Q: 1,
    detune: 0,
    gain: 1,
  };
  static contextTypes = {
    audioNode: React.PropTypes.any,
  };
  static childContextTypes = {
    audioNode: React.PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.audioNode = AudioContext.createBiquadFilter();
  }
  getChildContext = () => ({ audioNode: this.audioNode });
  componentDidMount() {
    this.context.audioNode.connect(this.audioNode);
    if (!React.Children.count(this.props.children)) {
      this.audioNode.connect(AudioContext.destination);
    }
  }
  render = () => {
    this.audioNode.type = this.props.type;
    this.audioNode.frequency.value = this.props.frequency;
    this.audioNode.Q.value = this.props.Q;
    this.audioNode.detune.value = this.props.detune;
    this.audioNode.gain.value = this.props.gain;
    return (
      <div>
        {this.props.children}
      </div>
    );
  };
}

export default Filter;
