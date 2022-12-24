import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { LoginType } from "../../../types/login.types";
import { UserType } from "../../../types/user.types";

const Login = () => {
  const [login, setLogin] = useState<LoginType>({
    email: "",
    password: "",
  });
  const [user, setUser] = useState<UserType>({
    email: "",
    password: "",
    name: "",
    avatar: null,
  });

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
    const res = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
      email: login.email,
      password: login.password,
    });
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

  //changing avatar type in usertype to FileList | null
  const handleRegisterFile = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      avatar: e.target.files,
    });
  };
  const json = {
    email: email,
    password: password,
    name: name,
    avatar: avatar,
  };
  const submitRegister = async () => {
    const res = await axios.post(
      "https://api.escuelajs.co/api/v1/users/",
      json
    );
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
