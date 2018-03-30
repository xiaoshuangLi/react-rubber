import { GLOBAL_ASSIGN_STATE, GLOBAL_SET_STATE } from '../constants';
import { createReducer } from '../func';

const initialState = {};

const global = createReducer(initialState, {
  [GLOBAL_ASSIGN_STATE](state, { data = {} } = {}) {
    const [attr = ''] = Object.keys(data);

    const obj = Object.assign({}, state[attr], data[attr]);

    return Object.assign({}, state, { [attr]: obj });
  },
  [GLOBAL_SET_STATE](state, { data = {} } = {}) {
    return Object.assign({}, state, data);
  },
});

export default {
  global,
};
