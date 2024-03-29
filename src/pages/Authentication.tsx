import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { LoginType } from "../types/LoginType";
import { useAppDispatch } from "../hooks/reduxHook";
import { createUser, logInUser } from "../redux/userReducer";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import LinearProgress from "@mui/material/LinearProgress";

interface newUserForm {
  firstName: "";
  lastName: "";
  userName: "";
  email: "";
  password: "";
  avatar: FileList;
}

const Authentication = () => {
  const dispatch = useAppDispatch();

  const [newUserStatus, setNewUserStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();

  const {
    register: register1,
    formState: { errors: errors1 },
    handleSubmit: handleSubmit1,
  } = useForm<newUserForm>();

  const nav = useNavigate();

  const LogInNewUser = () => {
    setNewUserStatus(false);
  };

  // login validation
  const onLogin: SubmitHandler<LoginType> = (data) => {
    setLoading(true);
    dispatch(logInUser(data)).then((res) => {
      //if logging is unsuccessful, the res.payload = undefined
      const unauthorized = res.payload;
      if (!unauthorized) {
        nav("/");
        setLoading(false);
        setLoginStatus(true);
      } else {
        setLoading(false);
        setLoginStatus(false);
      }
    });
  };

  // register validation
  const onRegister: SubmitHandler<newUserForm> = (data) => {
    setLoadingRegister(true);
    const newUser = {
      file: data.avatar[0],
      user: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        userName: data.userName,
        password: data.password,
        avatar: "",
      },
    };
    dispatch(createUser(newUser)).then((res) => {
      const unauthorized = res.payload;
      if (!unauthorized) {
        setLoadingRegister(false);
        setNewUserStatus(true);
      } else {
        setLoadingRegister(false);
        setNewUserStatus(true);
      }
    });
  };

  return (
    <div className="login-container">
      {newUserStatus ? (
        <div className="authentication-newUser">
          <h4>Your account is created successfully</h4>
          <button onClick={LogInNewUser}>Login now</button>
        </div>
      ) : (
        <div className="authentication-container">
          <form onSubmit={handleSubmit(onLogin)} className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <div className="authen-input">
              {loginStatus === false ? (
                <i>
                  <p>
                    <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                    Wrong Email or Password
                  </p>
                </i>
              ) : null}
              {errors.email && (
                <i>
                  <p>
                    <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                    Email is required
                  </p>
                </i>
              )}
              <input type="email" placeholder="Email" {...register("email", { required: true })} />
            </div>
            <div className="authen-input">
              {errors.password && (
                <i>
                  <p>
                    <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                    Password is required
                  </p>
                </i>
              )}
              <input type="password" placeholder="Password" {...register("password", { required: true })} />
            </div>
            {loading ? <LinearProgress /> : null}

            <button type="submit" className="authen-button">
              {loading ? "Signing in ..." : "Sign In"}
            </button>
          </form>
          <form onSubmit={handleSubmit1(onRegister)}>
            <h2>Don't have an account?</h2>
            <span>Sign up to get latest updates</span>

            <div className="authen-input">
              {errors1.firstName && (
                <i>
                  <p>
                    <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                    FirstName is required
                  </p>
                </i>
              )}
              <input type="text" placeholder="firstName" {...register1("firstName", { required: true })} />
            </div>

            <div className="authen-input">
              {errors1.lastName && (
                <i>
                  <p>
                    <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                    LastName is required
                  </p>
                </i>
              )}
              <input type="text" placeholder="lastName" {...register1("lastName", { required: true })} />
            </div>

            <div className="authen-input">
              {errors1.userName && (
                <i>
                  <p>
                    <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                    UserName is required
                  </p>
                </i>
              )}
              <input type="text" placeholder="userName" {...register1("userName", { required: true })} />
            </div>
            <div className="authen-input">
              {errors1.email && (
                <i>
                  <p>
                    <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                    Email is required
                  </p>
                </i>
              )}
              <input type="email" placeholder="email" {...register1("email", { required: true })} />
            </div>

            <div className="authen-input">
              {errors1.password && (
                <i>
                  <p>
                    <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                    Password is required
                  </p>
                </i>
              )}
              <input type="password" placeholder="password" {...register1("password", { required: true })} />
            </div>

            <div className="authen-input">
              {errors1.avatar && (
                <i>
                  <p>
                    <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                    Avatar is required
                  </p>
                </i>
              )}
              <input type="file" multiple {...register1("avatar", { required: true })} />
            </div>
            {loadingRegister ? <LinearProgress /> : null}
            <button className="authen-button">{loadingRegister ? "Registering..." : "Register"}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authentication;
