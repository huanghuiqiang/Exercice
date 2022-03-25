
function thunk(store) {
  return function (next) {
    return function(action) {
      // 从store中解构出dispatch, getState
      const { dispatch, getstate } = store;

      // 如果action是函数，将它拿出来运行，参数就是dispatch和getState
      if (typeof action === 'function') {
        return action(dispatch, getstate);
      }

      // 否则按照普通action处理
      let result = next(action);
      return result;
    }
  }
}

export default thunk;