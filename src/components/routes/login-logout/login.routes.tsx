import React, { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import { LoginType } from "../../../types/login.types";
import { UserType } from "../../../types/user.types";

const Login = () => {
  const [login, setLogin] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [file, setFile] = useState<FileList | null>(null);
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });
  const [loginStatus, setLoginStatus] = useState(false);

  const { email, password, name, avatar } = user;

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
          console.log(res.data);
          res.data && setLoginStatus(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

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

    console.log(file);
  };
  const json = {
    email: email,
    password: password,
    name: name,
    avatar: avatar,
  };
  const submitRegister = async () => {
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
            ...user,
            avatar: res.data.location,
          };
        })
      );
  };

  const createUser = async () => {
    try {
      await axios
        .post("https://api.escuelajs.co/api/v1/users/", json)
        .then((res) => {
          console.log(res.data);
          res.data && setLoginStatus(true);
          console.log(loginStatus);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    createUser();
  }, [file]);

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
