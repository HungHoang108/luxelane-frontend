import React, { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { LoginType } from "../../../types/login.types";
import { UserType } from "../../../types/user.types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/reduxHook";
// import { accessTokenn } from "../../../redux/access-token-reducer";
import { userLoginToken, userSessionInfo } from "../../../redux/user-reducer";

// import { useAppSelector } from "../../../hooks/reduxHook";

const Login = () => {
  // no idea why whenever i delete the line of code below, the user session is not being added to localstorage.
  // it obviously says that userAccessToken is not being used
  // const userAccessToken = useAppSelector((state) => state.AccessTokenReducer);

  const dispatch = useAppDispatch();
  const [login, setLogin] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [file, setFile] = useState<FileList | null>(null);
  const [status, setStatus] = useState(false);
  const [sessionStatus, setSessionStatus] = useState(false);

  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const { email, password, name, avatar } = user;
  const nav = useNavigate();

  useEffect(() => {
    dispatch(userSessionInfo());
    console.log("call");
  });

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

  const obj = {
    email: login.email,
    password: login.password,
  };

  const handleSubmit = async () => {
    dispatch(userLoginToken(obj));
    setSessionStatus(!sessionStatus);
    // try {
    //   await axios
    //     .post("https://api.escuelajs.co/api/v1/auth/login", {
    //       email: login.email,
    //       password: login.password,
    //     })
    //     .then((res) => {
    //       dispatch(accessTokenn(res.data.access_token));

    //       if (res.data) {
    //         nav("/");
    //       }
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
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

  // //get user session
  // const userSession = async () => {
  //   const loginToken = localStorage.getItem("userToken");
  //   if (loginToken) {
  //     await axios
  //       .get("https://api.escuelajs.co/api/v1/auth/profile", {
  //         headers: {
  //           Authorization: `Bearer ${loginToken}`,
  //         },
  //       })
  //       .then((res) => {
  //         localStorage.setItem("role", res.data.role);
  //         console.log(res.data);
  //       });
  //   }
  // };

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
