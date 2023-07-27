import React, { useState,useEffect } from "react";
import { login } from "../service/authService";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
function Login() {
  const TOKEN_KEY = "Token_Key";
  const NAME_KEY = "Name_key";
  const AVATAR_KEY = "Avatar_Key";
  const ROLE_KEY = "Role_Key";
  const navigate = useNavigate();
  // const [userGoogle, setUserGoogle] = useState([]);
  // const [profile, setProfile] = useState([]);
  const [check, setCheck] = useState({
    message: "",
  });
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { username, password } = user;
  const onInputChane = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(user)
      .then((response) => {
        console.log(response);
        if (response.data.status == 202) {
          setCheck({
            message: "Login failed! Please check your account !!!",
          });
        } else {
          // if (response.data.roles[0].authority == "DOCTOR") {

          // }
          if (response.data.message == "login_denied") {
            setCheck({
              message: "you have been locked nick !!!",
            });
          } else if (response.data.message == "v") {
            console.log(1);
          } else {
            sessionStorage.setItem(TOKEN_KEY, response.data.token);
            sessionStorage.setItem(NAME_KEY, response.data.name);
            sessionStorage.setItem(AVATAR_KEY, response.data.avatar);
            sessionStorage.setItem(ROLE_KEY, JSON.stringify(response.data.roles));
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => setUserGoogle(codeResponse),
  //   onError: (error) => console.log("Login Failed:", error),
  // });
  //  useEffect(() => {
  //    if (userGoogle) {
  //      axios
  //        .get(
  //          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userGoogle.access_token}`,
  //          {
  //            headers: {
  //              Authorization: `Bearer ${userGoogle.access_token}`,
  //              Accept: "application/json",
  //            },
  //          }
  //        )
  //        .then((res) => {
  //          setProfile(res.data);
  //        })
  //        .catch((err) => console.log(err));
  //    }
  //  }, [userGoogle]);
  //  console.log(profile);
  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form
                onSubmit={(e) => {
                  onSubmit(e);
                }}
              >
                <h2>Login</h2>
                <p style={{ color: "red" }}>{check.message}</p>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    username
                  </label>
                  <input
                    type="text"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a username"
                    name="username"
                    value={username}
                    onChange={(e) => onInputChane(e)}
                  />
                </div>
                {/* Password input */}
                <div className="form-outline mb-3">
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={(e) => onInputChane(e)}
                  />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  {/* Checkbox */}
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
                  {/* <button onClick={() => login()}>Sign in with Google 🚀 </button> */}
                  <p className="small fw-bold mt-2 pt-1 mb-0" style={{ color: "black" }}>
                    Don't have an account?{" "}
                    <NavLink to={"/register"} className="link-danger">
                      Register
                    </NavLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          {/* Copyright */}
          <div className="text-white mb-3 mb-md-0">Copyright © 2020. All rights reserved.</div>
          {/* Copyright */}
          {/* Right */}
          <div>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-twitter" />
            </a>
            <a href="#!" className="text-white me-4">
              <i className="fab fa-google" />
            </a>
            <a href="#!" className="text-white">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
          {/* Right */}
        </div>
      </section>
    </>
  );
}

export default Login;
