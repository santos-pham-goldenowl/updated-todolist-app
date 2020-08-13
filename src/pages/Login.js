import React from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../reduxManage/action/action";
import { fb } from "../authentication/firebase";

function LoginPage(props) {
  // let history = useHistory();
  // let location = useLocation();
  // let { from } = location.state || { from: { pathname: "/" } };

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
            console.log("com");
            fb.auth()
              .signInWithEmailAndPassword(values.email, values.password)
              .then((user) => {
                console.log("login success");
                props.login();
                // history.replace("/todolist");
                window.location = "/todolist";
              })
              .catch((e) => {
                console.log(e);
                window.location.reload();
              });
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
                        {errors.password && touched.password && errors.password}
                      </span>
                    </div>
                  </div>
                  <div className="btn-login">
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </div>
                  <div>
                    <Link to="/sign-up" className="has-not-account">
                      You haven't an acount yet?
                    </Link>
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
const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
