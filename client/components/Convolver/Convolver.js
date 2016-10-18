import React from 'react';
import AudioContext from '../../AudioContext';

class Convolver extends React.Component {
  static propTypes = {
    buffer: React.PropTypes.any.isRequired,
    normalize: React.PropTypes.bool,
    children: React.PropTypes.element,
  };
  static defaultProps = {
    normalize: true,
  };
  static contextTypes = {
    audioNode: React.PropTypes.any,
  };
  static childContextTypes = {
    audioNode: React.PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.audioNode = AudioContext.createConvolver();
    this.audioNode.normalize = this.props.normalize;
    this.audioNode.buffer = this.props.buffer;
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

export default Convolver;
