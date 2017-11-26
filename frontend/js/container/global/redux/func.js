const createReducer = (initState, handlers) => {
  return function reducer(state = initState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};

export default {
  createReducer,
};
