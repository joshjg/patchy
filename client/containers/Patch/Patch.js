import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MediaQuery from 'react-responsive';
import Panel from '../../components/Panel';
import ParamKnob from '../../components/ParamKnob';
import RadioGroup from '../../components/RadioGroup';
import Button from '../../components/Button';
import ButtonGroup from '../../components/ButtonGroup';
import styles from './Patch.css';

import {
  addOscillator,
  removeOscillator,
  setOscParam,
  addEffect,
  removeEffect,
  setEffectParam,
} from './actions';

const MAX_OSC = 5;

class Patch extends React.Component {
  static propTypes = {
    oscillators: React.PropTypes.arrayOf(React.PropTypes.object),
    effects: React.PropTypes.arrayOf(React.PropTypes.object),
    onClickAddOsc: React.PropTypes.func,
    onClickRemoveOsc: React.PropTypes.func,
    onChangeOscParam: React.PropTypes.func,
    onClickAddEffect: React.PropTypes.func,
    onClickRemoveEffect: React.PropTypes.func,
    onChangeEffectParam: React.PropTypes.func,
  };

  effectPanel = (eff, i) => {
    switch (eff.effect) {
      case 'filter':
        return (
          <Panel key={eff.key} label="FILTER" onClickRemove={() => this.props.onClickRemoveEffect(i)}>
            <RadioGroup
              label="type"
              options={{
                lowpass: 'Lowpass',
                highpass: 'Highpass',
                bandpass: 'Bandpass',
              }}
              value={eff.type}
              onChange={e => this.props.onChangeEffectParam(i, 'type', e.target.value)}
            />
            <ParamKnob log min={10} max={20000} step={1.08} toFixed={0} param="frequency" target={eff} targetId={i} onChange={this.props.onChangeEffectParam} />
            <ParamKnob log min={0.001} max={1000} step={1.32} param="Q" target={eff} targetId={i} onChange={this.props.onChangeEffectParam} />
            <ParamKnob min={-40} max={40} step={1} param="gain" target={eff} targetId={i} onChange={this.props.onChangeEffectParam} />
          </Panel>
        );
      case 'distortion':
        return (
          <Panel key={eff.key} label="DISTORT" onClickRemove={() => this.props.onClickRemoveEffect(i)}>
            <ParamKnob min={0} max={500} step={1} param="amount" target={eff} targetId={i} onChange={this.props.onChangeEffectParam} />
            <RadioGroup
              label="oversample"
              options={{
                none: 'none',
                '2x': '2x',
                '4x': '4x',
              }}
              value={eff.oversample}
              onChange={e => this.props.onChangeEffectParam(i, 'oversample', e.target.value)}
            />
          </Panel>
        );
      case 'convolver':
        return (
          <Panel key={eff.key} label="REVERB" onClickRemove={() => this.props.onClickRemoveEffect(i)}>
            <RadioGroup
              label="normalize"
              options={{
                true: 'On',
                false: 'Off',
              }}
              value={eff.normalize.toString()}
              onChange={e => this.props.onChangeEffectParam(i, 'normalize', e.target.value === 'true')}
            />
          </Panel>
        );
      case 'compressor':
        return (
          <Panel key={eff.key} label="COMPRESSOR" onClickRemove={() => this.props.onClickRemoveEffect(i)}>
            <ParamKnob small min={-100} max={0} step={1} param="threshold" target={eff} targetId={i} onChange={this.props.onChangeEffectParam} />
            <ParamKnob small min={0} max={40} step={1} param="knee" target={eff} targetId={i} onChange={this.props.onChangeEffectParam} />
            <ParamKnob small min={1} max={20} step={1} param="ratio" target={eff} targetId={i} onChange={this.props.onChangeEffectParam} />
            <ParamKnob small min={0} max={1} step={0.001} param="attack" target={eff} targetId={i} onChange={this.props.onChangeEffectParam} />
            <ParamKnob small min={0} max={1} step={0.01} param="release" target={eff} targetId={i} onChange={this.props.onChangeEffectParam} />
          </Panel>
        );
      default:
        return null;
    }
  };

  render = () => (
    <ReactCSSTransitionGroup
      transitionName={{
        appear: styles.appear,
        appearActive: styles.appearActive,
        enter: styles.enter,
        enterActive: styles.enterActive,
        leave: styles.leave,
        leaveActive: styles.leaveActive,
      }}
      transitionAppear
      transitionAppearTimeout={400}
      transitionEnterTimeout={150}
      transitionLeaveTimeout={150}
    >
      {this.props.oscillators.map((osc, i) => (
        <Panel
          key={osc.key}
          label={`OSC ${i + 1}`}
          removable={this.props.oscillators.length > 1}
          onClickRemove={() => this.props.onClickRemoveOsc(i)}
        >
          <RadioGroup
            options={{
              sine: 'Sine',
              square: 'Square',
              sawtooth: 'Sawtooth',
              triangle: 'Triangle',
            }}
            value={osc.type}
            activeColor="#0091B0"
            onChange={e => this.props.onChangeOscParam(i, 'type', e.target.value)}
          />
          <ParamKnob fgColor="#0091B0" min={0} max={8} step={0.5} param="octave" target={osc} targetId={i} onChange={this.props.onChangeOscParam} />
          <ParamKnob fgColor="#0091B0" min={-100} max={100} param="detune" target={osc} targetId={i} onChange={this.props.onChangeOscParam} />
          <ParamKnob fgColor="#0091B0" min={-1} max={1} step={0.1} param="pan" target={osc} targetId={i} onChange={this.props.onChangeOscParam} />
          <ParamKnob fgColor="#0091B0" min={0} max={2} step={0.05} param="gain" target={osc} targetId={i} onChange={this.props.onChangeOscParam} />
        </Panel>
      ))}

      {(this.props.oscillators.length < MAX_OSC) &&
        <ButtonGroup>
          <Button onClick={this.props.onClickAddOsc}>
            Add oscillator
          </Button>
        </ButtonGroup>
      }

      <Panel
        key="envelope"
        label="ENVELOPE"
        removable={false}
        height={125}
      >
        <ParamKnob small min={0} max={1} step={0.01} param="attack" target={this.props.oscillators[0]} targetId={-1} onChange={this.props.onChangeOscParam} />
        <ParamKnob small min={0} max={1} step={0.01} param="decay" target={this.props.oscillators[0]} targetId={-1} onChange={this.props.onChangeOscParam} />
        <ParamKnob small min={0.1} max={2} step={0.1} param="sustain" target={this.props.oscillators[0]} targetId={-1} onChange={this.props.onChangeOscParam} />
        <ParamKnob small min={0} max={2} step={0.01} param="release" target={this.props.oscillators[0]} targetId={-1} onChange={this.props.onChangeOscParam} />
      </Panel>

      {this.props.effects.map((eff, i) => (
        this.effectPanel(eff, i)
      ))}

      <MediaQuery minWidth={636}>
        <ButtonGroup>
          <Button onClick={() => this.props.onClickAddEffect('filter')} style={{ width: 0 }}>Add filter</Button>
          <Button onClick={() => this.props.onClickAddEffect('distortion')} style={{ width: 0 }}>Add distortion</Button>
          <Button onClick={() => this.props.onClickAddEffect('convolver')} style={{ width: 0 }}>Add reverb</Button>
          <Button onClick={() => this.props.onClickAddEffect('compressor')} style={{ width: 0 }}>Add compressor</Button>
        </ButtonGroup>
      </MediaQuery>
      <MediaQuery maxWidth={635}>
        <ButtonGroup>
          <Button onClick={() => this.props.onClickAddEffect('filter')} style={{ width: 0 }}>Filter</Button>
          <Button onClick={() => this.props.onClickAddEffect('distortion')} style={{ width: 0 }}>Distortion</Button>
          <Button onClick={() => this.props.onClickAddEffect('convolver')} style={{ width: 0 }}>Reverb</Button>
          <Button onClick={() => this.props.onClickAddEffect('compressor')} style={{ width: 0 }}>Compressor</Button>
        </ButtonGroup>
      </MediaQuery>
    </ReactCSSTransitionGroup>
  );
}

const mapStateToProps = state => ({
  oscillators: state.patch.local.oscillators,
  effects: state.patch.local.effects,
});

const mapDispatchToProps = dispatch => ({
  onClickAddOsc: () => dispatch(addOscillator()),
  onClickRemoveOsc: id => dispatch(removeOscillator(id)),
  onChangeOscParam: (id, param, value) => dispatch(setOscParam(id, param, value)),
  onClickAddEffect: effect => dispatch(addEffect(effect)),
  onClickRemoveEffect: id => dispatch(removeEffect(id)),
  onChangeEffectParam: (id, param, value) => dispatch(setEffectParam(id, param, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Patch);
