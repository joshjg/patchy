import React from 'react';
import { connect } from 'react-redux';
import { addSound, removeSound } from './actions';
import AudioContext from '../../AudioContext';
import Oscillator from '../../components/Oscillator';
import Gain from '../../components/Gain';
import Panner from '../../components/Panner';
import Filter from '../../components/Filter';
import WaveShaper from '../../components/WaveShaper';
import Convolver from '../../components/Convolver';
import Compressor from '../../components/Compressor';
import impulseResponse from '../../assets/irs/Ruby Room.wav';

class Synth extends React.Component {
  static propTypes = {
    activeSounds: React.PropTypes.arrayOf(React.PropTypes.any),
    handleKeyDown: React.PropTypes.func.isRequired,
    handleKeyUp: React.PropTypes.func.isRequired,
    patches: React.PropTypes.objectOf(React.PropTypes.object),
  };
  static defaultProps = {
    activeSounds: [],
  };
  constructor(props) {
    super(props);
    document.addEventListener('keydown', props.handleKeyDown);
    document.addEventListener('keyup', props.handleKeyUp);
    AudioContext.decodeAudioData(impulseResponse, (buffer) => {
      this.convolverBuffer = buffer;
    }, e => (console.error(e.err)));
  }
  renderEffect = (array, id) => {
    const eff = array[id];
    if (!eff) return null;
    switch (eff.effect) {
      case 'filter':
        return (
          <Filter
            type={eff.type}
            frequency={eff.frequency}
            Q={eff.Q}
            detune={eff.detune}
            gain={eff.gain}
          >
            {this.renderEffect(array, id + 1)}
          </Filter>
        );
      case 'distortion':
        return (
          <WaveShaper
            curve={eff.curve}
            oversample={eff.oversample}
          >
            {this.renderEffect(array, id + 1)}
          </WaveShaper>
        );
      case 'convolver':
        return (
          <Convolver
            buffer={this.convolverBuffer}
            normalize={eff.normalize}
          >
            {this.renderEffect(array, id + 1)}
          </Convolver>
        );
      case 'compressor':
        return (
          <Compressor
            threshold={eff.threshold}
            knee={eff.knee}
            ratio={eff.ratio}
            attack={eff.attack}
            release={eff.release}
          >
            {this.renderEffect(array, id + 1)}
          </Compressor>
        );
      default:
        return null;
    }
  };
  render = () => (
    <div>
      {this.props.activeSounds.map(sound => (
        <div key={sound.key}>
          {this.props.patches[sound.userId].oscillators.map((osc, j) => (
            <Oscillator
              key={j}
              frequency={sound.frequency}
              detune={osc.detune + ((osc.octave - 4) * 1200)}
              type={osc.type}
              attack={osc.attack}
              decay={osc.decay}
              sustain={osc.sustain}
              release={osc.release}
            >
              <Gain gain={osc.gain}>
                {(typeof AudioContext.createStereoPanner) === 'function' ? (
                  <Panner pan={osc.pan}>
                    {this.renderEffect(this.props.patches[sound.userId].effects, 0)}
                  </Panner>
                  ) : this.renderEffect(this.props.patches[sound.userId].effects, 0)
                }
              </Gain>
            </Oscillator>
          ))}
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  activeSounds: state.synth,
  patches: state.patch,
});

const mapDispatchToProps = dispatch => ({
  handleKeyDown: e => dispatch(addSound(e)),
  handleKeyUp: e => dispatch(removeSound(e)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Synth);
