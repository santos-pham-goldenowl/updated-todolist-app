const stateManager = {
  initialList: [
    {
      name: "Play soccer",
      id: 1,
      isComplete: false,
    },
  ],
  count: null,
  currentState: "all",
  inputContent: "",
};

// const stateInit = localStorage.getItem("todo-list");
// reducer
const TodoReducer = (state = stateManager, action) => {
  switch (action.type) {
    case "Add": {
      const newItem = action.content;
      const newState = { ...state };
      return Object.assign({}, newState, {
        initialList: [
          ...newState.initialList,
          {
            name: newItem,
            id: new Date().getTime(),
            isComplete: false,
          },
        ],
      });
    }
    case "Delete": {
      const newState = { ...state };
      const newArrList = [...newState.initialList];
      let index = newArrList.indexOf(action.item);
      newArrList.splice(index, 1);
      newState.initialList = newArrList;
      return Object.assign({}, newState);
    }
    case "Active item": {
      const newState = { ...state };
      let newArrList = [...newState.initialList];
      let index = newArrList.indexOf(action.item);
      newArrList = [
        ...newArrList.slice(0, index),
        {
          ...action.item,
          isComplete: !action.item.isComplete,
        },
        ...newArrList.slice(index + 1),
      ];
      newState.initialList = newArrList;
      return Object.assign({}, newState);
    }
    case "All actived items": {
      let newListArr = Object.assign({}, state, {
        currentState: "actived",
      });
      return newListArr;
    }
    case "All completed items": {
      let newListArr = Object.assign({}, state, {
        currentState: "completed",
      });
      return newListArr;
    }
    case "All items": {
      let newListArr = Object.assign({}, state, {
        currentState: "all",
      });
      return newListArr;
    }
    case "Select all items": {
      const newState = { ...state };
      const newArrList = [...newState.initialList];
      let index = newArrList.some((item) => item.isComplete === false);
      if (index) {
        newArrList.forEach((item) => {
          if (item.isComplete === false) {
            item.isComplete = true;
          }
        });
      } else {
        newArrList.forEach((item) => {
          item.isComplete = false;
        });
      }
      newState.initialList = newArrList;
      return Object.assign({}, newState);
    }
    default:
      return state;
  }
};

export default TodoReducer;
