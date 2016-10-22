export default store => next => (action) => {
  if (store.getState().root.id === action.userId) {
    const newAction = {
      ...action,
      userId: 'local',
    };
    return next(newAction);
  } else if (action.userId) {
    return next(action);
  }
  const newAction = {
    ...action,
    userId: store.getState().root.id,
  };
  return next(newAction);
};
