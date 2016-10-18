import React from 'react';
import AudioContext from '../../AudioContext';

class WaveShaper extends React.Component {
  static propTypes = {
    curve: React.PropTypes.object,
    oversample: React.PropTypes.string,
    children: React.PropTypes.element,
  };
  static defaultProps = {
    oversample: '2x',
  };
  static contextTypes = {
    audioNode: React.PropTypes.any,
  };
  static childContextTypes = {
    audioNode: React.PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.audioNode = AudioContext.createWaveShaper();
  }
  getChildContext = () => ({ audioNode: this.audioNode });
  componentDidMount() {
    this.context.audioNode.connect(this.audioNode);
    if (!React.Children.count(this.props.children)) {
      this.audioNode.connect(AudioContext.destination);
    }
  }
  render = () => {
    this.audioNode.curve = this.props.curve;
    this.audioNode.oversample = this.props.oversample;
    return (
      <div>
        {this.props.children}
      </div>
    );
  };
}

export default WaveShaper;
