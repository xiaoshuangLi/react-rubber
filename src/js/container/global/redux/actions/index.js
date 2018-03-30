import { GLOBAL_ASSIGN_STATE, GLOBAL_SET_STATE } from '../constants';

// actionType => (默认值, state的key值) tab => 传入的参数
const actionStateByAttr = type => (dValue, attr) => (value = dValue) => ({
  type,
  data: attr === undefined ? value : { [attr]: value },
});

// assign state特定属性，针对为对象的属性使用 state.params = {}
const assignStateByAttr = actionStateByAttr(GLOBAL_ASSIGN_STATE);

// set state特定属性，类似重置, 清空
const setStateByAttr = actionStateByAttr(GLOBAL_SET_STATE);

export const globalSetAttr = setStateByAttr({}, 'Attr');

export const globalAssignAttr = assignStateByAttr({}, 'Attr');
