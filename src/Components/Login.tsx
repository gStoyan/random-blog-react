import React from "react";
import { useState } from "react";
import useForm from "../Hooks/useForm";
import useFetch from "../Hooks/useFetch";
import { resolve } from "path";

const Login = () => {
  const [isWaiting, setIsWaiting] = useState(false);

  const login = useFetch("http://localhost:3000/auth/login");
  const onRegisterSubmit = async (data: any) => {
    setIsWaiting(true);
    const response = login();
    if (response.error) {
      setIsWaiting(false);
      alert(`Error: ${response.error.message}`);
      return;
    }
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("authToken", token);
    }
    setIsWaiting(false);
    alert(`Success! \n ${JSON.stringify(data)}`);
  };
  const { values, changeHandler, onSubmit, errors } = useForm(
    {
      username: "",
      email: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    },
    onRegisterSubmit
  );
  console.log(errors);
  return (
    <>
      {isWaiting ? (
        <p>Waiting...</p>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={onSubmit} className="login-form">
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={values.username}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                name="email"
                id="email"
                value={values.email}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth">Date of birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={values.dateOfBirth}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={changeHandler}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password:</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={values.confirmPassword}
                onChange={changeHandler}
              />
            </div>
            <p className="error-field">
              {errors?.email || errors?.password || errors?.repeatPassword}
            </p>
            <button
              type="submit"
              className="submit-button"
              disabled={
                !!(errors?.email || errors?.password || errors?.repeatPassword)
              }
            >
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
