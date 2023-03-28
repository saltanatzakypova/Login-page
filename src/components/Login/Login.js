import React, { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const actionType = {
  change_Email_value: "change_Email_value",
  change_Email_value_Validation: "change_Email_value_Validation",
  change_password_value: "change_password_value",
  change_password_value_Validation: "change_password_value_Validation",
};

const formReduser = (state, action) => {
  console.log(action);
  if (action.type === actionType.change_Email_value) {
    return {
      ...state,
      email: action.payload,
    };
  }
  if (action.type === actionType.change_Email_value_Validation) {
    return {
      ...state,
      isEamilValid: state.email.includes("@"),
    };
  }
  if (action.type === actionType.change_password_value) {
    return {
      ...state,
      password: action.payload,
    };
  }
  if (action.type === actionType.change_password_value_Validation) {
    return {
      ...state,
      isPasswordValid: state.password.trim().length > 6,
    };
  }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  // const [formIsValid, setFormIsValid] = useState(false);

  const [formState, dispatchForm] = useReducer(formReduser, {
    email: "",
    isEmailValid: true,
    password: "",
    isPasswordValid: true,
    isFormValid: false,
  });

  // console.log(formReduser);
  // console.log(dispatchForm);

  const emailChangeHandler = (event) => {
    dispatchForm({
      type: actionType.change_Email_value,
      payload: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchForm({
      type: actionType.change_password_value,
      payload: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.value.includes("@"));
    dispatchForm({
      type: actionType.change_Email_value_Validation,
    });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchForm({
      type: actionType.change_password_value_Validation,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formState.email, formState.password);
  };

  const isFormValid = () => {
    return (
      formState.email.includes("@") && formState.password.trim().length > 6
    );
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.isEmailValid ? "" : classes.invalid
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={formState.email}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.isPasswordValid ? "" : classes.invalid
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="true"
            value={formState.password}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!isFormValid()}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
