// action
const addItem = (content) => {
  return {
    type: "Add",
    content: content,
  };
};

const deleteItem = (item) => {
  return {
    type: "Delete",
    item: item,
  };
};

const activeItem = (item) => {
  return {
    type: "Active item",
    item: item,
  };
};

const activedItems = () => {
  return {
    type: "All actived items",
  };
};

const completedItems = () => {
  return {
    type: "All completed items",
  };
};
const allItems = () => {
  return {
    type: "All items",
  };
};

const selectAll = () => {
  return {
    type: "Select all items",
  };
};

const login = () => {
  return {
    type: "Login",
  };
};

const signout = () => (dispatchs) => {
  console.log("SigningOut...");
  setTimeout(() => {
    dispatchs({
      type: "Signout",
    });
    window.location = "/login";
    console.log("Signed");
  }, 3000);
};

// const signout = () => {
//   setTimeout(() => {
//     return {
//       type: "Signout",
//     };
//   });
// };

export {
  addItem,
  deleteItem,
  activeItem,
  activedItems,
  completedItems,
  allItems,
  selectAll,
  login,
  signout,
};
