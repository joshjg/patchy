import { ADD_TOUCH, UPDATE_TOUCH, REMOVE_TOUCH } from './constants';

const reducer = (state = {
  targets: {
    65: [],
    87: [],
    83: [],
    69: [],
    68: [],
    70: [],
    84: [],
    71: [],
    89: [],
    72: [],
    85: [],
    74: [],
    75: [],
    79: [],
    76: [],
    80: [],
    186: [],
    222: [],
  },
  touches: {},
}, action) => {
  switch (action.type) {
    case ADD_TOUCH:
      return {
        ...state,
        targets: {
          ...state.targets,
          [action.targetId]: [
            ...state.targets[action.targetId],
            action.touchId,
          ],
        },
        touches: {
          ...state.touches,
          [action.touchId]: action.targetId,
        },
      };
    case UPDATE_TOUCH: {
      const prevTargetId = state.touches[action.touchId];
      if (prevTargetId === null
        || prevTargetId === undefined
        || prevTargetId === action.targetId
      ) {
        return state;
      }
      const prevIndex = state.targets[prevTargetId].indexOf(action.touchId);
      return { // TODO index !==-1
        ...state,
        targets: {
          ...state.targets,
          [action.targetId]: [
            ...state.targets[action.targetId],
            action.touchId,
          ],
          [prevTargetId]: [
            ...state.targets[prevTargetId].slice(0, prevIndex),
            ...state.targets[prevTargetId].slice(prevIndex + 1),
          ],
        },
        touches: {
          ...state.touches,
          [action.touchId]: action.targetId,
        },
      };
    }
    case REMOVE_TOUCH: {
      const prevTargetId = state.touches[action.touchId];
      if (prevTargetId === null || prevTargetId === undefined) {
        return state;
      }
      const prevIndex = state.targets[prevTargetId].indexOf(action.touchId);
      return {
        ...state,
        targets: {
          ...state.targets,
          [prevTargetId]: [
            ...state.targets[prevTargetId].slice(0, prevIndex),
            ...state.targets[prevTargetId].slice(prevIndex + 1),
          ],
        },
        touches: {
          ...state.touches,
          [action.touchId]: null,
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
