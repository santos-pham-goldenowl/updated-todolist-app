import React from "react";
import { Formik } from "formik";
import { fb } from "../authentication/firebase";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errAuth: "",
    };
  }
  render() {
    const { errAuth } = this.state;
    return (
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
        //onSubmit (Sign up)
        onSubmit={(values, { setSubmitting }) => {
          console.log("Sign up");
          fb.auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((user) => {
              window.location = "/login";
            })
            .catch((error) => {
              // resetForm(initialValues);
              setSubmitting(false);
              this.setState({
                errAuth: "The email has already existed",
              });
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
                  <p>Sign up</p>
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
                <div className="error">{errAuth}</div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

export default SignUp;
