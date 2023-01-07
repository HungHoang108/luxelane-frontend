import { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { LoginType } from "../../types/login.types";
import { UserType } from "../../types/user.types";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { accessTokenn } from "../../redux/access-token-reducer";

import "./login-logout.style.scss";

const Login = () => {
  // no idea why whenever i delete the line of code below, the user session is not being added to localstorage.
  // it obviously says that userAccessToken is not being used
  const userAccessToken = useAppSelector((state) => state.AccessTokenReducer);

  const dispatch = useAppDispatch();
  const [login, setLogin] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [file, setFile] = useState<FileList | null>(null);
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const { email, password, name, avatar } = user;
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
    try {
      await axios
        .post("https://api.escuelajs.co/api/v1/auth/login", {
          email: login.email,
          password: login.password,
        })
        .then((res) => {
          dispatch(accessTokenn(res.data.access_token));
          localStorage.setItem("userToken", res.data.access_token);
          if (res.data) {
            nav("/");
          }
        });
    } catch (error) {
      console.log(error);
    }
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
    setFile(e.target.files);
  };

  const submitRegister = async () => {
    try {
      await axios
        .post(
          "https://api.escuelajs.co/api/v1/files/upload",
          { file: file && file[0] },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) =>
          setUser((prev) => {
            return {
              ...prev,
              avatar: res.data.location,
            };
          })
        );
      setStatus(!status);
    } catch (error) {
      console.log(error);
    }
  };
  const json = {
    email: email,
    password: password,
    name: name,
    avatar: avatar,
  };

  const createUser = async () => {
    if (file) {
      try {
        await axios
          .post("https://api.escuelajs.co/api/v1/users/", json)
          .then((res) => {
            nav("/");
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    createUser();
  }, [status]);

  useEffect(() => {
    userSession();
  });

  const userSession = async () => {
    const loginToken = localStorage.getItem("userToken");
    if (loginToken) {
      await axios
        .get("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        })
        .then((res) => {
          localStorage.setItem("role", res.data.role);
          console.log(res.data);
        });
    }
  };

  return (
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
        <span>Sign up to get our latest updates and more</span>

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
  );
};

export default Login;
