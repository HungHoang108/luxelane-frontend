import React, { ChangeEvent, useState } from "react";
import axios from "axios";

interface authen {
  email: string;
  password: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  //   const json = { email: email, password: password };

  const handleSubmit = async () => {
    // console.log(json);
    const res = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
      email: email,
      password: password,
    });

    console.log(res.data);
  };

  const handleRegister = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "username") {
      setUserName(e.target.value);
    } else if (e.target.name === "useremail") {
      setUserEmail(e.target.value);
    } else {
      setUserPass(e.target.value);
    }
  };
    const json = { name: userName, email: userEmail, password: userPass };
  const submitRegister = async () => {
    const res = await axios.post("https://api.escuelajs.co/api/v1/users/", json);
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };

  return (
    <div>
      <h2>Login</h2>

      <div>
        <div>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div>
          <button onClick={handleSubmit}>submit</button>
        </div>
      </div>

      <div>
        <h2>Register</h2>
        <div>
          <input type="text" name="username" onChange={handleRegister} />
        </div>
        <div>
          <input type="email" name="useremail" onChange={handleRegister} />
        </div>
        <div>
          <input
            type="password"
            name="userpassword"
            onChange={handleRegister}
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
