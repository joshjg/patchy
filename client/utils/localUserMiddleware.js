const middleware = store => next => (action) => {
  const newAction = {
    ...action,
    userId: (store.getState().root.id === action.userId) ? 'local' : action.userId,
  };
  return next(newAction);
};

export default middleware;
