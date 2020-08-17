import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { login } from "../reduxManage/action/action";
import { fb } from "../authentication/firebase";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  handleLogin = ({ email, password }) => {
    console.log(email);
    console.log(password);
    fb.auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log("login success");
        this.props.login();
        // history.replace("/todolist");
        window.location = "/todolist";
      })
      .catch((e) => {
        console.log("e: ", e);
        // this.setState({
        //   error: "Error! Your account or password is not correct.",
        // });
        // window.location.reload();
        console.log("??????");
      });
  };
  // let history = useHistory();
  // let location = useLocation();
  // let { from } = location.state || { from: { pathname: "/" } };
  render() {
    return (
      <div>
        <div className="login">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.password) {
                errors.password = "Required";
              }
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            //onSubmit (Sign in)
            onSubmit={(values) => {
              this.handleLogin(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="form">
                  <div className="form-container">
                    <div className="title">
                      <p>Login</p>
                    </div>
                    <div className="user-input">
                      <div className="input-email">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <span className="error">
                          {errors.email && touched.email && errors.email}
                        </span>
                      </div>
                      <div className="input-pw">
                        <input
                          type="password"
                          name="password"
                          placeholder="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        <span className="error">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </span>
                      </div>
                    </div>
                    <div className="btn-login">
                      <button type="submit" disabled={isSubmitting}>
                        Submit
                      </button>
                    </div>
                    <div className="has-not-account">
                      <Link to="/sign-up">You haven't an acount yet?</Link>
                    </div>
                    <div>
                      {this.state.error ? (
                        <p className="err-login">{this.state.error}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
