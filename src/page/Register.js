import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postUsers } from "../service/authService";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Register() {
  let navigate = useNavigate();
  const [check, setCheck] = useState({
    message: "",
  });
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    roles: ["user"],
  });
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  const { name, username, email, password, repeatPassword } = user;
  const onInputChane = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let postNewUser = {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password,
      roles: ["user"],
    };

    if (user.password != user.repeatPassword) {
      setCheck({
        message: "Repeat your password error!!!",
      });
      user.repeatPassword = "";
      user.password = "";
    } else {
      postUsers(postNewUser).then((res) =>{
         if (res.data.message == "User_Name_already_exists") {
          setCheck({ message: "Username already exists!!!!" });
          user.username = "";
        } else if (res.data.message == "Email_already_exists") {
                    setCheck({ message: "Email already exists!!!!" });
          user.email = "";
        } else if (res.data.message == "create_success") {
          setCheck({ message: "" });
          navigate("/login");
           toast("Create success !!!", {
             position: toast.POSITION.TOP_CENTER,
           });
        }
      }).catch((err)=>{
        console.log(err);
      });
    };

  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee",marginTop:'3%' }}>
        <div className="container h-100" style={{ paddingTop: "2%" }}>
          <div
            className="row d-flex justify-content-center align-items-center h-100"
            style={{ backgroundColor: "white" }}
          >
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                      <p style={{ color: "red",marginLeft:'25%' }}>{check.message}</p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={(e) => {
                          onSubmit(e);
                        }}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example1c">
                              Name
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="name"
                              value={name}
                              onChange={(e) => onInputChane(e)}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example1c">
                              User Name
                            </label>
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="username"
                              value={username}
                              onChange={(e) => onInputChane(e)}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example3c">
                              Email
                            </label>
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              value={email}
                              onChange={(e) => onInputChane(e)}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example4c">
                              Password
                            </label>
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="password"
                              value={password}
                              onChange={(e) => onInputChane(e)}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example4c">
                              Repeat your password
                            </label>
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="repeatPassword"
                              value={repeatPassword}
                              onChange={(e) => onInputChane(e)}
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer transition={Zoom} />
    </>
  );
}

export default Register;
