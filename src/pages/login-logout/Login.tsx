import { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginType } from "../../types/LoginType";
import { newUserInputField } from "../../types/UserType";
import { useAppDispatch } from "../../hooks/reduxHook";
import { createUser, logInUser } from "../../redux/userReducer";

const Login = () => {
  const dispatch = useAppDispatch();

  let userData = localStorage.getItem("userInfo");
  useEffect(() => {
    userData = localStorage.getItem("userInfo");
  }, []);

  const [login, setLogin] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [newUserStatus, setNewUserStatus] = useState(false);

  const [user, setUser] = useState<newUserInputField>({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const nav = useNavigate();

  //Login
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async () => {
    dispatch(logInUser(login));
    nav("/");
  };

  //Create user
  const handleRegister = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleRegisterFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.target.files && setFile(e.target.files[0]);
  };
  const newUser = {
    file: file,
    user: user,
  };
  const submitRegister = async () => {
    dispatch(createUser(newUser));
    setNewUserStatus(true);
  };

  const LogInNewUser = () => {
    setNewUserStatus(false);
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
          <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <div className="authen-input">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="authen-input">
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <button className="authen-button" onClick={handleSubmit}>
              Sign In
            </button>
          </div>
          <div>
            <h2>Don't have an account?</h2>
            <span>Sign up to get latest updates</span>
            <div className="authen-input">
              <input
                type="email"
                name="email"
                onChange={handleRegister}
                placeholder="email"
              />
            </div>
            <div className="authen-input">
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleRegister}
              />
            </div>
            <div className="authen-input">
              <input
                type="text"
                name="name"
                placeholder="name"
                onChange={handleRegister}
              />
            </div>
            <div className="authen-input">
              <input
                type="file"
                name="avatar"
                onChange={handleRegisterFile}
                multiple
              />
            </div>
            <button className="authen-button" onClick={submitRegister}>
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
