import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TodoItemPresentational from "../Component/TodoItemPresentational";
import { fb, ref } from "../authentication/firebase";
import {
  addItem,
  deleteItem,
  activeItem,
  activedItems,
  completedItems,
  allItems,
  selectAll,
} from "../reduxManage/action/action";

class TodoListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
    };
  }

  componentDidMount() {
    this.authUser();
  }

  authUser = () => {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.showInfor();
      }
    });
  };

  // - add an item
  addItem = (e) => {
    const { value } = e.target;
    if (e.keyCode === 13 && value) {
      e.target.value = "";
      this.props.addItem(value);
    }
  };

  // - delete an item
  removeItem = (e, item) => {
    this.props.deleteItem(item);
  };

  // - active an item
  activeItem = (e, item) => {
    this.props.activeItem(item);
  };

  // - actived item
  activedItems = () => {
    this.props.activedItem();
  };

  // - complete items
  completedItems = () => {
    this.props.completedItems();
  };

  // - all items
  allItems = () => {
    this.props.allItems();
  };

  // - select all item
  selectAll = () => {
    this.props.selectAll();
  };

  // onChange
  onChange = (e) => {
    const nameInput = e.target.name;
    const inputValue = e.target.value;
    this.setState({
      [nameInput]: inputValue,
    });
  };

  // - create user's information
  createUserInfor = (e) => {
    const user = fb.auth().currentUser;
    e.preventDefault();
    const { name } = this.state;
    const { uid, email } = user;
    ref.push({
      id: uid,
      email,
      name,
    });
    window.location.reload();
    console.log("Created");
  };

  // - get user'information
  showInfor = () => {
    // - user is available when component rendered
    const user = fb.auth().currentUser;
    let userName;
    if (user) {
      const prom = new Promise((res) => {
        ref.on("value", (snap) => {
          const userNameList = snap.val();
          const newList = Object.entries(userNameList);
          res(newList);
        });
      });

      prom
        .then((newList) => {
          newList.forEach((item) => {
            console.log(item[1]);
            if (item[1].email === user.email) {
              userName = item[1].name;
            }
          });
          this.setState({
            userName,
          });
        })
        .catch((error) => {
          throw new Error("Error showing user's information");
        });
      console.log("asyn...");
    }
  };

  container = () => {
    const { userName } = this.state;
    const { todoLists } = this.props; // object
    const { initialList } = todoLists; // array
    const state = todoLists.currentState;
    const newListArr =
      state === "all"
        ? initialList
        : initialList.filter((item) => {
            return item.isComplete === (state === "completed");
          });
    // -custom classname
    const clTemp = initialList[0] ? "" : "hide";

    // - count the actived items
    let count = 0;
    initialList.forEach((element) => {
      if (element.isComplete === false) {
        count++;
      }
    });

    return {
      initialList,
      newListArr,
      count,
      clTemp,
      userName,
    };
  };

  render() {
    const {
      initialList,
      newListArr,
      count,
      clTemp,
      userName,
    } = this.container();
    return (
      <div className="">
        <div className="header-todo">
          <h1>todos</h1>
        </div>
        <div className="container">
          <div className="list">
            <div className="new-todo">
              {initialList[0] && (
                <div className="select-all icon" onClick={this.selectAll} />
              )}
              <input
                type="text"
                className="input"
                placeholder="What need to be done?"
                // name="email"
                onKeyDown={this.addItem}
              />
            </div>
            <div className="content">
              <TodoItemPresentational
                itemsList={newListArr}
                removeItem={this.removeItem}
                activeItem={this.activeItem}
                activedItems={this.activedItems}
                completedItems={this.completedItems}
                allItems={this.allItems}
                clTemp={clTemp}
                count={count}
                onChange={this.onChange}
                createUserInfor={this.createUserInfor}
                userName={userName}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
TodoListContainer.propTypes = {
  itemsList: PropTypes.array,
  removeItem: PropTypes.func,
  activeItem: PropTypes.func,
  state: PropTypes.string,
  active: PropTypes.func,
  complete: PropTypes.func,
  all: PropTypes.func,
};

const mapStateToProps = (state) => {
  // console.log("Todolist in todlistcontainer: ", state.TodoReducer);
  return {
    todoLists: state.TodoReducer,
    user: state.UserReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
    deleteItem: (item) => dispatch(deleteItem(item)),
    activeItem: (item) => dispatch(activeItem(item)),
    activedItem: () => dispatch(activedItems()),
    completedItems: () => dispatch(completedItems()),
    allItems: () => dispatch(allItems()),
    selectAll: () => dispatch(selectAll()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
