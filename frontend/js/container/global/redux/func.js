const _createReducer = (initState, handlers) => {
  return function reducer(state = initState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};

export { _createReducer as createReducer };