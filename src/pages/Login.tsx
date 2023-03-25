import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { LoginType } from "../types/LoginType";
import { useAppDispatch } from "../hooks/reduxHook";
import { createUser, logInUser } from "../redux/userReducer";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface newUserForm {
  email: "";
  password: "";
  name: "";
  avatar: FileList;
}

const Login = () => {
  const dispatch = useAppDispatch();

  const [newUserStatus, setNewUserStatus] = useState(false);
  const [loginStatus, setLoginStatus] = useState(true);
  const [loading, setLoading] = useState(false);

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
    const test = dispatch(logInUser(data)).then((response) => {
      const token: string = response.payload as string;

      if (token) {
        localStorage.setItem("userToken", token);
        nav("/");
        setLoading(false);
        setLoginStatus(true);
      } else {
        setLoginStatus(false);
      }
    });
    console.log(test)
  };

  // register validation
  const onRegister: SubmitHandler<newUserForm> = (data) => {
    const newUser = {
      file: data.avatar[0],
      user: {
        email: data.email,
        password: data.password,
        name: data.name,
        avatar: "",
      },
    };
    dispatch(createUser(newUser));
    setNewUserStatus(true);
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
              {errors1.name && (
                <i>
                  <p>
                    <WarningAmberIcon color="error" sx={{ fontSize: "14px" }} />
                    Name is required
                  </p>
                </i>
              )}
              <input type="text" placeholder="name" {...register1("name", { required: true })} />
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
            <button className="authen-button">Register</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
