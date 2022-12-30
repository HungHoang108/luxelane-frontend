import React, { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { LoginType } from "../../../types/login.types";
import { UserType } from "../../../types/user.types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { isLogIn } from "../../../redux/loginStatus-reducer";
import { accessToken } from "../../../redux/access-token-reducer";

import { useAppSelector } from "../../../hooks/reduxHook";

const Login = () => {
  const userAccessToken = useAppSelector((state) => state.AccessTokenReducer);
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [file, setFile] = useState<FileList | null>(null);
  const [status, setStatus] = useState(false);
  const [sessionStatus, setSessionStatus] = useState(false);
  const [tokenCode, setTokenCode] = useState("");
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
      const test1 = await axios
        .post("https://api.escuelajs.co/api/v1/auth/login", {
          email: login.email,
          password: login.password,
        })
        .then((res) => {
          const test = res.data.access_token;
          dispatch(accessToken(test));
          setTokenCode(test);
          if (res.data) {
            setSessionStatus(true);
            nav("/");
            dispatch(isLogIn(true));
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
            res.data && dispatch(isLogIn(true));
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

  //Get user session
  // const accessToken = tokenCode.access_token;
  useEffect(() => {
    userSession();
  });

  const userSession = async () => {
    if (userAccessToken) {
      console.log("hello");
      await axios
        .get("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <div>
        <div>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div>
          <button onClick={handleSubmit}>submit</button>
        </div>
      </div>

      <div>
        <h2>Register</h2>
        <div>
          <input
            type="email"
            name="email"
            onChange={handleRegister}
            placeholder="email"
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleRegister}
          />
        </div>
        <div>
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleRegister}
          />
        </div>
        <div>
          <input
            type="file"
            name="avatar"
            onChange={handleRegisterFile}
            multiple
          />
        </div>
        <div>
          <button onClick={submitRegister}>submit</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
