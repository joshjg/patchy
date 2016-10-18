import React from 'react';
import AudioContext from '../../AudioContext';

class Compressor extends React.Component {
  static propTypes = {
    threshold: React.PropTypes.number,
    knee: React.PropTypes.number,
    ratio: React.PropTypes.number,
    attack: React.PropTypes.number,
    release: React.PropTypes.number,
    children: React.PropTypes.element,
  };
  static defaultProps = {
    threshold: -24,
    knee: 30,
    ratio: 12,
    attack: 0.003,
    release: 0.25,
  };
  static contextTypes = {
    audioNode: React.PropTypes.any,
  };
  static childContextTypes = {
    audioNode: React.PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.audioNode = AudioContext.createDynamicsCompressor();
    this.audioNode.threshold.value = this.props.threshold;
    this.audioNode.knee.value = this.props.knee;
    this.audioNode.ratio.value = this.props.ratio;
    this.audioNode.attack.value = this.props.attack;
    this.audioNode.release.value = this.props.release;
  }
  getChildContext = () => ({ audioNode: this.audioNode });
  componentDidMount() {
    this.context.audioNode.connect(this.audioNode);
    if (!React.Children.count(this.props.children)) {
      this.audioNode.connect(AudioContext.destination);
    }
  }
  render = () => (
    <div>
      {this.props.children}
    </div>
  );
}

export default Compressor;
