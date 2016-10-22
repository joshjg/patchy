import { ADD_TOUCH, UPDATE_TOUCH, REMOVE_TOUCH } from '../containers/Keyboard/constants';
import { addSound, removeSound } from '../containers/Synth/actions';

export default store => next => (action) => {
  switch (action.type) {
    case ADD_TOUCH:
      if (store.getState().keyboard.targets[action.targetId].length === 0) {
        store.dispatch(addSound(action.targetId));
      }
      break;
    case UPDATE_TOUCH: {
      const state = store.getState().keyboard;
      const prevTargetId = state.touches[action.touchId];
      if (prevTargetId === null
        || prevTargetId === undefined
        || prevTargetId === action.targetId
      ) break;
      store.dispatch(addSound(action.targetId));
      if (state.targets[prevTargetId].length === 1) {
        store.dispatch(removeSound(prevTargetId));
      }
      break;
    }
    case REMOVE_TOUCH: {
      const state = store.getState().keyboard;
      const prevTargetId = state.touches[action.touchId];
      if (prevTargetId === null || prevTargetId === undefined) break;
      if (state.targets[prevTargetId].length === 1) {
        store.dispatch(removeSound(prevTargetId));
      }
      break;
    }
    default:
      break;
  }
  return next(action);
};
