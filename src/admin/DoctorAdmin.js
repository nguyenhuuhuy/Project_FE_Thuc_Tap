import React, { useEffect, useState } from "react";
import "./style/doctorAdmin.css";
import { getDetailDoctorById, getListDoctor, getSearchDoctorByName, putActiceDoctor, putBlockDoctor } from "../service/doctorService";

function DoctorAdmin() {
  const [listDoctor, setListDoctor] = useState();
  const [detailDoctorById,setDetailDoctorById] = useState();
  const [searchDoctor,setSearchDoctor] = useState({
    name:"",
  })
  function listDoctorData() {
    getListDoctor().then((res) => setListDoctor(res.data));
  }
  useEffect(() => {
    listDoctorData();
  }, []);
  let element = null;
  if (listDoctor == undefined) {
    element = null;
  } else {
    element = listDoctor.map((e, index) => {
      return (
        <tr key={index} style={{ textAlign: "center" }}>
          <td>{index + 1}</td>
          <td>
            <a href="#" onClick={()=>handleDetailDoctor(e.id)}>{e.user.name}</a>
          </td>
          <td>{e.specialty.name}</td>
          <td>{e.work == true ? "active" : "not acvite"}</td>
          <td>
            {e.user.status == false ? (
              <>
                <i class="fa-solid fa-lock-open"></i>
              </>
            ) : (
              <>
                <i class="fa-solid fa-lock"></i>
              </>
            )}
          </td>
          <td>
            {e.work == true ? (
              <></>
            ) : (
              <>
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  onClick={() => handleCreateDoctor(e.id, e.user.id)}
                >
                  active Doctor
                </button>
              </>
            )}
          </td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={() => handleBlockDoctor(e.id, e.user.id)}
            >
              Block
            </button>
          </td>
        </tr>
      );
    });
  }

  const handleCreateDoctor = (doctorId, userId) => {
    let activeDoctor = {
      doctorId: doctorId,
      userId: userId,
    };
    putActiceDoctor(activeDoctor).then((res) => {
      alert("active doctor success !!!");
      listDoctorData();
    });
  };

  const handleBlockDoctor = (doctorId, userId) => {
    let blockDoctor = {
      doctorId: doctorId,
      userId: userId,
    };
    putBlockDoctor(blockDoctor).then((res) => {
      console.log(res.data);
      if (res.data.message == "block_success") {
        alert("block doctor success !!!");
        listDoctorData();
      } else if (res.data.message == "un_block_success") {
        alert("un block doctor success !!!");
        listDoctorData();
      }
    });
  };

  const handleDetailDoctor = (userId)=>{
    getDetailDoctorById(userId).then((res)=>{
      setDetailDoctorById(res.data);
    })
  }
  console.log(detailDoctorById);
  let rederDetailDoctor = "";
  if (detailDoctorById == undefined) {
      rederDetailDoctor = "";
  }else {
    rederDetailDoctor = (
      <>
        <div className="container" style={{ marginTop: "5%" }}>
          <div className="team-single">
            <div className="row">
              <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                <div className="team-single-img">
                  <img src={detailDoctorById.user.avatar} alt="" />
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="team-single-text padding-50px-left sm-no-padding-left">
                  <h4 className="font-size38 sm-font-size32 xs-font-size30">DETAIL DOCTOR</h4>
                  <div className="contact-info-section margin-40px-tb">
                    <ul className="list-style9 no-margin">
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="far fa-gem text-yellow" />
                            <strong className="margin-10px-left text-yellow">NAME:</strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <h6>{detailDoctorById.user.name}</h6>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="fas fa-envelope text-pink" />
                            <strong className="margin-10px-left xs-margin-four-left text-pink">
                              Email:
                            </strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <h6>{detailDoctorById.user.email}</h6>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="fas fa-map-marker-alt text-green" />
                            <strong className="margin-10px-left text-green">SPECIALTYH:</strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <h6>{detailDoctorById.specialty.name}</h6>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="fa-solid fa-user text-orange"></i>
                            <strong className="margin-10px-left text-orange">ROLE:</strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <h6>{detailDoctorById.user.roles[0].name}</h6>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-12"></div>
            </div>
          </div>
        </div>
      </>
    );
  }


const { name} = searchDoctor;
  const handleInputChange = (e)=>{
    setSearchDoctor({ ...searchDoctor, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    let search = {
      name: searchDoctor.name
    }
    getSearchDoctorByName(search.name)
    .then((res)=>{
      if (res.data.message == "not_found") {
        alert("doctor name exited")
        listDoctorData();
      } else{
      setListDoctor(res.data);
      }
    })
    .catch((err)=>{
        listDoctorData();
    })
  }
  return (
    <>
      {rederDetailDoctor}
      <div className="col-xs-8 col-xs-offset-2 well" style={{ justifyContent: "center",marginBottom:'20%' }}>
        <form
          className="form-inline my-2 my-lg-0"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="name"
            value={name}
            onChange={(e) => handleInputChange(e)}
            required
          />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <table className="table table-scroll table-striped">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>#</th>
              <th>Doctor Name</th>
              <th>Specialty</th>
              <th>status</th>
              <th>status user</th>
              <th colSpan={2}>Edit</th>
            </tr>
          </thead>
          <tbody>{element}</tbody>
        </table>
      </div>
    </>
  );
}

export default DoctorAdmin;
