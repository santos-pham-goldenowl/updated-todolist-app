import React from "react";
// import PropTypes from "prop-types";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import TodoItemContainer from "../Container/TodoItemContainer";
import Home from "../Container/Home";
import SignUp from "../Container/Signup";
import LoginPage from "../Container/Login";

class TodoPresentational extends React.Component {
  render() {
    const { signOut, isLogin } = this.props;
    return (
      <Router>
        <div className="app">
          <div className="header">
            <nav className="navigation">
              <ul>
                <li>
                  <Link to="/" className="nav-items">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/todolist" className="nav-items">
                    TodoList
                  </Link>
                </li>
                <div className="user-act">
                  {!isLogin && (
                    <Link to="/login" className="nav-items">
                      Login
                    </Link>
                  )}
                  {!isLogin && (
                    <Link to="/signup" className="nav-items">
                      Sign up
                    </Link>
                  )}
                </div>
                <div className="log-out">
                  {isLogin && (
                    <button type="buton" onClick={signOut}>
                      Sign out
                    </button>
                  )}
                </div>
              </ul>
            </nav>
          </div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/todolist">
              {/* {user.isLogin ? <TodoItemContainer /> : <LoginPage />} */}
              {isLogin ? <TodoItemContainer /> : <Redirect to="/login" />}
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default TodoPresentational;
