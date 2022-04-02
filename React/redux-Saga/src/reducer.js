const initState = {
  userInfo: null,
  error: ''
};

function reducer(state = initState, action) {
  console.log('====>reducer', action);
  switch (action.type) {
    case 'FETCH_USER_SUCCEEDED':
      return { ...state, userInfo: action.payload };
    case 'FETCH_USER_FAILED':
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}

export default reducer;