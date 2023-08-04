import React, { useState } from "react";
import "../../style/header.css";
import { useNavigate,NavLink } from "react-router-dom";
import { getSearchAll } from "../../service/authService";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Header() {
  const navigate = useNavigate();
  const [searchAll, setSearchAll] = useState({ search: "" });
  const [listDoctor, setListDoctor] = useState();
  const [listSpecialty, setListSpecialty] = useState();
  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/");
  };
  const {search} = searchAll;
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? "white" : "black",
    backgroundColor: isActive ? "#AB7442" : "white",
    marginRight: 15,
  });
  const handleHome = () => {
    window.scroll(0, 0);
  };
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
    } else if (role[0].authority == "DOCTOR") {
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
            <button
              type="button"
              className=" nav-link btn btn-info btn-lg "
              onClick={() => navigate("/createDoctor")}
            >
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
            <img
              src={avatar}
              className="avatar"
              style={{ marginTop: "30%" }}
              onClick={() => handleDetailUser()}
            />
          </div>
          <p style={{ color: "black", marginTop: 20, marginLeft: 10 }}>{username}</p>
        </li>
        <li>
          <button
            type="button"
            className="btn btn-primary"
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

  const handleDetailUser = () => {
    navigate("/detail/user");
  };

  const handleInputChange = (e) => {
    setSearchAll({ ...searchAll, [e.target.name]: e.target.value });
    if (e.target.value == "") {
      setListDoctor();
      setListSpecialty();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newSearch = {
      search: searchAll.search,
    };
    getSearchAll(newSearch.search)
      .then((res) => {
        if (res.data.message == "not_found") {
          toast.warning("not found !!!", { position: toast.POSITION.TOP_CENTER });
          setListDoctor(res.data.doctorList);
          setListSpecialty(res.data.specialtyList);
          setSearchAll({search:""});
        } else {
          setListDoctor(res.data.doctorList);
          setListSpecialty(res.data.specialtyList);
          setSearchAll({ search: "" });
        }
        
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let renderListDoctorSearch = null;
  let renderListSpecialtySearch = null;
    if (listDoctor == undefined) {
    renderListDoctorSearch = null;
  } else {
    renderListDoctorSearch = listDoctor.map((e, index) => {
      return (
        <tr style={{ textAlign: "center" }} key={index}>
          <td style={{ objectFit: "cover" }}>
            <img src={e.user.avatar} style={{ width: "30px", height: "30px" }} />
          </td>
          <td style={{textAlign:'start'}}>
            <NavLink to={`/detail/doctor/${e.id}`} onClick={() => handleCloseSearch()}>
              {e.user.name}
            </NavLink>
          </td>
        </tr>
      );
    });
     
  }
  if (listSpecialty == undefined) {
    renderListSpecialtySearch = null
  } else {
    renderListSpecialtySearch = listSpecialty.map((e, index) => {
      return (
        <tr style={{ textAlign: "center" }} key={index}>
          <td>
            <NavLink to={`/detail/specialty/${e.id}`} onClick={()=>handleCloseSearch()}>{e.name}</NavLink>
          </td>
        </tr>
      );
    });
  }

  const handleCloseSearch = () => {
    setListDoctor();
    setListSpecialty();
  };
  

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ position: "fixed", width: "100%", top: "0" }}
      >
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

            <div className="searchAll">
              <form
                className="form-inline my-2 my-lg-0"
                style={{ marginRight: "250px" }}
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  value={search}
                  onChange={(e) => handleInputChange(e)}
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                  Search
                </button>
              </form>
              {renderListDoctorSearch == null ? (
                <></>
              ) : (
                <>
                  <table className="table table-scroll table-striped" >
                    <tbody style={{ height: "200px", width: "500px", backgroundColor: "white",zIndex:'1000' }}>
                      <tr>
                        <td>Doctor</td>
                      </tr>
                      {renderListDoctorSearch}
                      <tr>
                        <td>specialty</td>
                      </tr>
                      {renderListSpecialtySearch}
                    </tbody>
                  </table>
                </>
              )}
              {renderListSpecialtySearch == null ? (
                <></>
              ) : (
                <>
                  <table className="table table-scroll table-striped">
                    <tbody style={{ height: "200px", width: "500px", backgroundColor: "white",zIndex:'1000' }}>
                      <tr>
                        <td>Doctor</td>
                      </tr>
                      {renderListDoctorSearch}
                      <tr>
                        <td>specialty</td>
                      </tr>
                      {renderListSpecialtySearch}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          <ul className="navbar-nav">
            {element}
          </ul>
        </div>
        <div>
          <button className="go_home" onClick={() => handleHome()}>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </nav>
      <ToastContainer transition={Zoom} />
    </>
  );
}

export default Header;
