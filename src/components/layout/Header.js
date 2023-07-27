import React from "react";
import "../../style/header.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "white" : "black",
    backgroundColor: isActive ? "#d0a772" : "white",
    marginRight: 15,
  });
  const handleHome = ()=>{
    window.scroll(0, 0);
  }
  const username = sessionStorage.getItem("Name_key");
  const avatar = sessionStorage.getItem("Avatar_Key");
  let elementAdmin = "";
  let role = JSON.parse(sessionStorage.getItem("Role_Key"));
  if (role == null) {
  } else {
    if (role[0].authority == "ADMIN") {
      elementAdmin = (
        <>
          <li className="nav-item active">
            <NavLink className="nav-link" to={"/specialtyAdmin"} style={navLinkStyle}>
              SPECIALTY MANAGE
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to={"/doctorAdmin"} style={navLinkStyle}>
              DOCTOR MANAGE
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to={"/userAdmin"} style={navLinkStyle}>
              USER MANAGE
            </NavLink>
          </li>
        </>
      );
    } else if(role[0].authority == "DOCTOR"){
      elementAdmin = (
        <>
          <li className="nav-item active">
            <NavLink className="nav-link" to={"/homeDoctor"} style={navLinkStyle}>
              DoctorManage
            </NavLink>
          </li>
        </>
      );
    } else {
      elementAdmin = (
        <>
          <li className="nav-item active">
            <NavLink className="nav-link" to={"/historyOder"} style={navLinkStyle}>
              History
            </NavLink>
          </li>
          <li className="nav-item active">
            <button type="button" class=" nav-link btn btn-info btn-lg " onClick={()=>navigate('/createDoctor')}>
              want to be a doctor
            </button>
          </li>
        </>
      );
    }
  }
  let element = "";
  if (username) {
    element = (
      <>
        <li className="nav-item" id="nav_avatar">
          <div>
            <img src={avatar} className="avatar" style={{marginTop:'30%'}}/>
          </div>
          <p style={{ color: "black", marginTop: 20, marginLeft: 10 }}>{username}</p>
        </li>
        <li>
          <button
            type="button"
            class="btn btn-primary"
            style={{ marginTop: "17px", marginLeft: "10px" }}
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </li>
      </>
    );
  } else {
    element = (
      <>
        <li className="nav-item active" style={{ marginRight: "10px" }}>
          <NavLink className="nav-link" to={"/login"} style={navLinkStyle}>
            Login
          </NavLink>
        </li>
        <li className="nav-item active">
          <NavLink className="nav-link" to={"/register"} style={navLinkStyle}>
            Register
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" style={{ paddingBottom: "0" }}>
            <li className="nav-item active">
              <NavLink className="nav-link" to={"/"} style={navLinkStyle}>
                Home
              </NavLink>
            </li>
            {elementAdmin}
          </ul>
          {/* <form className="form-inline my-2 my-lg-0" style={{ marginRight: "400px" }}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form> */}
          <ul className="navbar-nav" style={{ marginRight: "200px" }}>
            {element}
          </ul>
        </div>
        <div>
          <button className="go_home" onClick={()=>handleHome()}>
            <i class="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Header;
