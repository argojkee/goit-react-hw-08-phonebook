import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PiSpinnerGap } from 'react-icons/pi';
import { MdAppRegistration } from 'react-icons/md';
import { BiLogIn } from 'react-icons/bi';
import { RegistrationLoginFormStyle } from './RegistrationLoginFormStyle';
import { useRegisterMutation, useLogInMutation } from 'redux/baseApi';
import { toastSuccess, toastError } from 'toastNotification/toastNotification';

const RegistrationLoginForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const [registration] = useRegisterMutation();
  const [logIn, { isLoading: isPending }] = useLogInMutation();

  const isLoginPage = location.pathname === '/login';

  const handleChange = ({ target }) => {
    if (isLoginPage) {
      if (target.name === 'email') {
        setEmail(target.value);
      } else if (target.name === 'password') {
        setPassword(target.value);
      }
    } else {
      if (target.name === 'name') {
        setName(target.value);
      } else if (target.name === 'email') {
        setEmail(target.value);
      } else if (target.name === 'password') {
        setPassword(target.value);
      }
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (isLoginPage) {
      if (email && password) {
        const result = await logIn({ password, email });

        if (result.error) {
          toastError(
            'Not valid email or password. Please, try again or register new account'
          );
        } else {
          toastSuccess('Log in successfull. Welcome back to your phone book');
        }
      }
    } else {
      if (name && email && password) {
        const result = await registration({ name, email, password });

        if (result.error) {
          toastError('Something went wrong. Please try again or log in');
        } else {
          toastSuccess('Registration succesfull. Welcome to phone book');
        }
      }
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
      <RegistrationLoginFormStyle autoComplete="off" onSubmit={handleSubmit}>
        {!isLoginPage && (
          <div className="label-container">
            <input
              placeholder="Name"
              id="name"
              type="text"
              name="name"
              onChange={handleChange}
              value={name}
            />
            <label htmlFor="name">Name</label>
          </div>
        )}
        <div className="label-container">
          <input
            placeholder="Email"
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={email}
          />
          <label htmlFor="email">Email</label>
        </div>
        <div className="label-container">
          <input
            placeholder="Password"
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
          <label htmlFor="password">Password</label>
        </div>
        <button
          disabled={
            isLoginPage
              ? !(!!email && password.length >= 7)
              : !(!!name && !!email && password.length >= 7)
          }
          type="submit"
        >
          {isPending ? (
            <PiSpinnerGap className="spinner" size={16} />
          ) : isLoginPage ? (
            <BiLogIn size={16} />
          ) : (
            <MdAppRegistration size={16} />
          )}
          {isLoginPage ? `Login` : `Registration`}
        </button>
      </RegistrationLoginFormStyle>
    </>
  );
};

export default RegistrationLoginForm;
