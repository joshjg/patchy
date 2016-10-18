import React from 'react';
import AudioContext from '../../AudioContext';

class Gain extends React.Component {
  static propTypes = {
    gain: React.PropTypes.number,
    children: React.PropTypes.element,
  };
  static defaultProps = {
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
    this.audioNode = AudioContext.createGain();
  }
  getChildContext = () => ({ audioNode: this.audioNode });
  componentDidMount() {
    this.context.audioNode.connect(this.audioNode);
    if (!React.Children.count(this.props.children)) {
      this.audioNode.connect(AudioContext.destination);
    }
  }
  render = () => {
    this.audioNode.gain.value = this.props.gain;
    return (
      <div>
        {this.props.children}
      </div>
    );
  };
}

export default Gain;
