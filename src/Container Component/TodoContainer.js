import React from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";

import { fb } from "../authentication/firebase";
import { signout, login } from "../reduxManage/action/action";
import TodoPresentational from "../Presentational Component/TodoPresentational";

class TodoContainer extends React.Component {
  // login thành công thì lấy user làm giá trị boolean từ fb.auth().onAuthStateChanged
  // componentDidMout() {
  //   this.authListener();
  // }

  // authListener = () => {
  //   fb.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       //login
  //       console.log("user before login");
  //       this.props.login();
  //     } else {
  //       //sign out
  //       this.props.signOut();
  //     }
  //   });
  // };

  // - sign out
  signOut = () => {
    fb.auth()
      .signOut()
      .then(() => {
        this.props.signout();
      })
      .catch((error) => {
        console.log("error log out: ", error);
      });
  };
  isLogin = () => {
    const { user } = this.props;
    const localStorageState = localStorage.getItem("persist:root");
    let isLoginLocalStorage;
    if (localStorageState) {
      const isLoginTemp = JSON.parse(localStorageState).UserReducer;
      isLoginLocalStorage = JSON.parse(isLoginTemp).isLogin;
    }
    const temp = isLoginLocalStorage;
    const isLogin = temp ? temp : user.isLogin;
    return isLogin;
  };

  render() {
    const { todoLists } = this.props;
    return (
      <div>
        <TodoPresentational
          todoLists={todoLists}
          signOut={this.signOut}
          isLogin={this.isLogin()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todoLists: state.TodoReducer,
    user: state.UserReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signout: () => dispatch(signout()),
    login: () => dispatch(login()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
