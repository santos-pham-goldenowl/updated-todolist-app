const stateManager = {
  isLogin: false,
};

// const stateInit = localStorage.getItem("todo-list");
// reducer
const UserReducer = (state = stateManager, action) => {
  switch (action.type) {
    case "Login": {
      const newState = { ...state };
      newState.isLogin = true;
      return Object.assign({}, newState);
    }
    case "Signout": {
      const newState = { ...state };
      newState.isLogin = false;
      return Object.assign({}, newState);
    }
    default:
      return state;
  }
};

export default UserReducer;
