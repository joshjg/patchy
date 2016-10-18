import React from 'react';
import AudioContext from '../../AudioContext';

class Panner extends React.Component {
  static propTypes = {
    pan: React.PropTypes.number,
    children: React.PropTypes.element,
  };
  static defaultProps = {
    pan: 0,
  };
  static contextTypes = {
    audioNode: React.PropTypes.any,
  };
  static childContextTypes = {
    audioNode: React.PropTypes.any,
  };
  constructor(props) {
    super(props);
    if (typeof AudioContext.createStereoPanner === 'function') {
      this.audioNode = AudioContext.createStereoPanner();
    } else {
      this.audioNode = this.context.audioNode;
    }
  }
  getChildContext = () => ({ audioNode: typeof AudioContext.createStereoPanner === 'function' ? this.audioNode : this.context.audioNode });
  componentDidMount() {
    if (typeof AudioContext.createStereoPanner === 'function') {
      this.context.audioNode.connect(this.audioNode);
      if (!React.Children.count(this.props.children)) {
        this.audioNode.connect(AudioContext.destination);
      }
    } else if (!React.Children.count(this.props.children)) {
      this.context.audioNode.connect(AudioContext.destination);
    }
  }
  render = () => {
    this.audioNode.pan.value = this.props.pan;
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Panner;
