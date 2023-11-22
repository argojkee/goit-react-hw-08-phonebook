import { useLocation } from "react-router-dom";
import { PiSpinnerGap } from "react-icons/pi";
import { MdAppRegistration } from "react-icons/md";
import { BiLogIn } from "react-icons/bi";
import { RegistrationLoginFormStyle } from "./RegistrationLoginFormStyle.styled";
import { useRegisterMutation, useLogInMutation } from "redux/baseApi";
import { toastSuccess, toastError } from "toastNotification/toastNotification";
import { setUser } from "../../redux/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import * as yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { ErrorText } from "components/ErrorFormText/ErrorFormTextStyle.styled";

const initialRegisterValues = {
  name: "",
  email: "",
  password: "",
};

const schemaRegister = yup.object().shape({
  name: yup
    .string()
    .min(6, "Field name must be 6 symbols minimum")
    .max(16, "Field name must be 16 symbols maximum")
    .required("Field name is required"),

  email: yup.string().email().required("Field email is required"),
  password: yup
    .string()
    .min(7, "Password must be 7 symbols minimum")
    .max(16, "Password must be 16 symbols maximum")
    .required("Field password is required"),
});

const initialLoginValues = {
  email: "",
  password: "",
};

const schemaLogin = yup.object().shape({
  email: yup.string().email().required("Field email is required"),

  password: yup
    .string()
    .min(7, "Field password must be 7 symbols minimum")
    .max(16, "Field password must be 16 symbols minimum")
    .required("Field password is required"),
});

const RegistrationLoginForm = () => {
  const location = useLocation();
  const [
    registration,
    { isLoading: isRegisterLoading, isError: isRegisterError },
  ] = useRegisterMutation();
  const [logIn, { isLoading: isLoginLoading, isError: isLoginError }] =
    useLogInMutation();
  const dispatch = useAppDispatch();

  const isLoginPage = location.pathname === "/login";

  const handleSubmit = ({ name, email, password }) => {
    if (isLoginPage) {
      logIn({ password, email })
        .unwrap()
        .then(resp => {
          dispatch(
            setUser({
              user: resp.user,
              token: resp.token,
            })
          );
          toastSuccess("Log in successful. Welcome back to your phone book");
        })
        .catch(err => {
          toastError(
            "Not valid email or password. Please, try again or register new account"
          );
        });
    } else {
      registration({ name, email, password })
        .unwrap()
        .then(resp => {
          dispatch(
            setUser({
              user: resp.user,
              token: resp.token,
            })
          );
          toastSuccess("Registration successful. Welcome to phone book");
        })
        .catch(err => {
          toastError("Something went wrong. Please, try again");
        });
      // if (isRegisterError) {
      //   toastError("Something went wrong. Please try again or log in");
      // } else {
      //   toastSuccess("Registration successful. Welcome to phone book");
      // }
    }
  };

  return (
    <>
      <h2>
        {isLoginPage ? (
          <span className="first">Login </span>
        ) : (
          <span className="first">Registration </span>
        )}
        Page
      </h2>
      <Formik
        onSubmit={handleSubmit}
        initialValues={isLoginPage ? initialLoginValues : initialRegisterValues}
        validationSchema={isLoginPage ? schemaLogin : schemaRegister}
      >
        <RegistrationLoginFormStyle autoComplete="off">
          {!isLoginPage && (
            <div className="label-container">
              <Field
                placeholder="Name"
                id="name"
                type="text"
                name="name"
                // onChange={handleChange}
                // value={name}
              />
              <label htmlFor="name">Name</label>
            </div>
          )}
          <div className="label-container">
            <Field
              placeholder="Email"
              id="email"
              type="email"
              name="email"
              // onChange={handleChange}
              // value={email}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="label-container">
            <Field
              placeholder="Password"
              id="password"
              type="password"
              name="password"
              // onChange={handleChange}
              // value={password}
            />
            <label htmlFor="password">Password</label>
          </div>
          <button
            // disabled={
            //   isLoginPage
            //     ? !(!!email && password.length >= 7)
            //     : !(!!name && !!email && password.length >= 7)
            // }
            type="submit"
          >
            {isRegisterLoading || isLoginLoading ? (
              <PiSpinnerGap className="spinner" size={16} />
            ) : isLoginPage ? (
              <BiLogIn size={16} />
            ) : (
              <MdAppRegistration size={16} />
            )}
            {isLoginPage ? `Login` : `Registration`}
          </button>
          {isLoginPage ? null : (
            <ErrorMessage
              name="name"
              component="div"
              render={message => <ErrorText>{message}</ErrorText>}
            />
          )}
          <ErrorMessage
            name="email"
            component="div"
            render={message => <ErrorText>{message}</ErrorText>}
          />
          <ErrorMessage
            name="password"
            component="div"
            render={message => <ErrorText>{message}</ErrorText>}
          />
        </RegistrationLoginFormStyle>
      </Formik>
    </>
  );
};

export default RegistrationLoginForm;
