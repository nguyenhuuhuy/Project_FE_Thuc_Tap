import React, { useState, useEffect } from "react";
import "../style/doctorHome.css";
import { useNavigate } from "react-router-dom";
import { getDetailDoctor } from "../service/doctorService";
import { createNewTimeSlotByDoctor, getListOderTimesByDoctorId } from "../service/TimeSlotsService";
import {
  cancelBookingByTimeSlotId,
  getDetailBookingsByTimeSlotId,
  successBookingByTimeSlotId,
} from "../service/bookingsService";

function DoctorHome() {
    const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState(false);
  const [doctor, setDoctor] = useState();
  const [listTimes, setListTimes] = useState();
  const [detailOderUser, SetDetailOderUser] = useState();
  const [timeSlotExited, setTimeSlotExited] = useState({
    message: "",
  });
  const [doctorOderTime, setDoctorOderTime] = useState({
    date_book: "",
    time_book: "",
  });
  const { date_book, time_book } = doctorOderTime;
  const close = (e) => {
    e.preventDefault();
    setActive(!active);
  };
  function getDoctorData() {
    getDetailDoctor()
      .then((res) => setDoctor(res.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getDoctorData();
  }, []);
  const username = sessionStorage.getItem("Name_key");
  const avatar = sessionStorage.getItem("Avatar_Key");
  let element = "";
  if (doctor == undefined) {
    element = "";
  } else if (doctor != {}) {
    element = (
      <>
        <div className="tab-pane active" id="profile">
          <p className="lead" style={{ color: "black" }}>
            My Profile
          </p>
          <hr />
          <div className="row">
            <div className="col-md-6">
              <p style={{ color: "black" }}>
                <strong>Email: </strong>
                {doctor.user.email}
              </p>
              <p style={{ color: "black" }}>
                <strong>Specialty: </strong>
                {doctor.specialty.name}
              </p>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-success" onClick={()=>handleOpen()}>
              <i className="fa fa-plus-circle" /> Oder Times
            </button>
          </div>
        </div>
      </>
    );
  }

const handleOpen = () => {
  setStatus(!status);
};

  let renderList = "";
  const handdleListTimes = (id) => {
    getListOderTimesByDoctorId(id)
      .then((res) => {
        if (res.data.message == "not_found") {
            alert("No list booking !!!")
            navigate("/homeDoctor");
        } else{
        setListTimes(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (listTimes == undefined) {
    renderList = "";
  } else {
    renderList = listTimes.map((e, index) => {
      return (
        <div className="col-md-6" key={index}>
          <div className="timetable-item">
            <div className="timetable-item-main">
              <div className="timetable-item-time">{e.date_book}</div>
              <div className="timetable-item-name">{e.times}</div>
              {e.booked == true ? (
                <>
                  <button
                    className="btn btn-primary btn-book"
                    onClick={() => handleDetailTimeslots(e.id)}
                  >
                    View
                  </button>
                </>
              ) : (
                <></>
              )}
              <div className="timetable-item-like">
                <div className="timetable-item-like-count">{e.id}</div>
                <div className="timetable-item-like-count">
                  {e.booked == true ? "oder" : "not oder"}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  const handleDetailTimeslots = (id) => {
    setActive(!active);
    getDetailBookingsByTimeSlotId(id)
      .then((res) => SetDetailOderUser(res.data))
      .catch((err) => console.log(err));
  };
  let renderDetailOder = "";
  if (detailOderUser == undefined) {
    renderDetailOder = "";
  } else {
    renderDetailOder = detailOderUser.map((e, index) => {
      return (
        <div id={active ? "contentSubmit" : "contentSubmit_close"} key={index}>
          <i className="fa-solid fa-xmark" id="close" onClick={close} />
          <div className="team-single">
            <div className="row">
              <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                <div className="team-single-img">
                  <img src={e.user.avatar} alt="" style={{ width: "100px", height: "100px" }} />
                </div>
              </div>
              <div className="col-lg-8 col-md-7" style={{ marginLeft: "7px" }}>
                <div className="team-single-text padding-50px-left sm-no-padding-left">
                  <h4 className="font-size38 sm-font-size32 xs-font-size30">User Oder</h4>
                  <p className="no-margin-bottom">Conent: {e.reason}</p>
                  <div className="contact-info-section margin-40px-tb">
                    <ul className="list-style9 no-margin">
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="far fa-gem text-yellow" />
                            <strong className="margin-10px-left text-yellow">NAME:</strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <p>{e.user.name}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="far fa-file text-lightred" />
                            <strong className="margin-10px-left text-lightred">
                              Bokking Status:
                            </strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <p>{e.isConfirm}</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="row">
                          <div className="col-md-5 col-5">
                            <i className="fas fa-map-marker-alt text-green" />
                            <strong className="margin-10px-left text-green">Oder Date:</strong>
                          </div>
                          <div className="col-md-7 col-7">
                            <p>{e.date_book}</p>
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
                            <p>{e.user.email}</p>
                            {/* <p>{e.timeSlot.doctor.id}</p> */}
                          </div>
                        </div>
                      </li>
                      <li>
                        <div style={{display:'flex'}}>
                          {e.isConfirm == "ACCEPT" ? (
                            <></>
                          ) : (
                            <>
                              <button
                                type="submit"
                                class="btn btn-success btn-lg"
                                onClick={() => successOder(e.id)}
                              >
                                Confirm
                              </button>
                              <button
                                type="button"
                                class="btn btn-danger btn-lg"
                                style={{ marginLeft: "10px" }}
                                onClick={() => accessDenied(e.id, e.timeSlot.doctor.id)}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                class="btn btn-primary btn-lg"
                                style={{ marginLeft: "10px" }}
                                onClick={close}
                              >
                                Close
                              </button>
                            </>
                          )}
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
      );
    });
  }

  const successOder = (id) => {
    successBookingByTimeSlotId(id).then((res) => console.log(res.data));
    setActive(!active);
  };
  const accessDenied = (id, doctorId) => {
    console.log(id);
    console.log(doctorId);
    cancelBookingByTimeSlotId(id).then((res) => {
      if (res.data.message == "update_success") {
        getListOderTimesByDoctorId(doctorId)
          .then((res) => setListTimes(res.data))
          .catch((err) => {
            console.log(err);
          });
        setActive(!active);
      }
    });
  };

  const handleChange = (e) => {
    setDoctorOderTime({ ...doctorOderTime, [e.target.name]: e.target.value });
  };
  
  const handleOderSubmit = (e) => {
    e.preventDefault();
    let newTimeSlot = {
      date_book: doctorOderTime.date_book,
      time_book: doctorOderTime.time_book,
    };
    createNewTimeSlotByDoctor(newTimeSlot)
      .then((res) => {
        setStatus(!status);
        alert("create success!!!");
      })
      .catch((err) => {
        setTimeSlotExited({
          message: " same date and time ",
        });
      });
  };
  return (
    <>
      <div className="container bootstrap snippets bootdey">
        <div className="row">
          {/* BEGIN USER PROFILE */}
          <div className="col-md-12">
            <div className="grid profile">
              <div className="grid-header">
                <div className="col-xs-2">
                  <img
                    src={avatar}
                    className="img-circle"
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="col-xs-7">
                  <h3>{username}</h3>
                </div>
              </div>
              <div className="grid-body">
                <ul className="nav nav-tabs">
                  <li className="active">
                    <a href="#profile" data-toggle="tab" className="btn btn-info">
                      Profile
                    </a>
                  </li>
                  <li className="active" style={{ marginLeft: "10px" }}>
                    <button
                      href="#timeline"
                      data-toggle="tab"
                      className="btn btn-info"
                      onClick={() => handdleListTimes(doctor.id)}
                    >
                      Timeline
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  {/* BEGIN PROFILE */}
                  {element}
                  {/* END PROFILE */}
                  {/* BEGIN TIMELINE */}
                  <div className="tab-pane" id="timeline">
                    <p className="lead">My Timeline</p>
                    <hr />
                    <div className="idance">
                      <div className="schedule content-block">
                        <div className="container">
                          <div className="timetable">
                            {/* Schedule Top Navigation */}
                            <div className="tab-content">
                              <div className="tab-pane show active">
                                <div className="row">
                                  {/* Schedule Item 1 */}
                                  {renderList}
                                  {/* Schedule Item 2 */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* END TIMELINE */}
                </div>
              </div>
            </div>
          </div>
          {/* END USER PROFILE */}
        </div>
      </div>
      {renderDetailOder}

      {/* <div className="oderTime">
                
                
                <button type="button" class="btn btn-primary btn-lg">Large button</button>
            </div> */}

      <form className={status ? "oderTime" : "oderTime_close"}>
        <div className="form-group">
          <div className="col-12">
            <i class="fa-solid fa-xmark" id="close_oder"></i>
            <p style={{ color: "red" }}>{timeSlotExited.message}</p>
            <label className="form-label">Times</label>
            <select
              className="select2 form-control select2-hidden-accessible"
              data-select2-placeholder="Select country"
              data-select2-id="select2-data-1-gy14"
              tabIndex={-1}
              aria-hidden="true"
              defaultValue={time_book}
              onChange={(e) => handleChange(e)}
              name="time_book"
            >
              <option data-select2-id="select2-data-3-ibs9" />
              <option value="7H-8H">7H-8H</option>
              <option value="8H30-9H30">8H30-9H30</option>
              <option value="10H-11H">10H-11H</option>
              <option value="1H-2H">1H-2H</option>
              <option value="2H30-3H30">2H30-3H30</option>
              <option value="4H-5H">4H-5H</option>
            </select>
            <span
              className="select2 select2-container select2-container--bootstrap-5"
              dir="ltr"
              data-select2-id="select2-data-2-46y9"
              style={{ width: 391 }}
            >
              <span className="selection">
                <span
                  className="select2-selection select2-selection--single"
                  role="combobox"
                  aria-haspopup="true"
                  aria-expanded="false"
                  tabIndex={0}
                  aria-disabled="false"
                  aria-labelledby="select2-vp8l-container"
                  aria-controls="select2-vp8l-container"
                >
                  <span
                    className="select2-selection__rendered"
                    id="select2-vp8l-container"
                    role="textbox"
                    aria-readonly="true"
                    title="Select country"
                  >
                    <span className="select2-selection__placeholder">Select Times</span>
                  </span>
                  <span className="select2-selection__arrow" role="presentation">
                    <b role="presentation" />
                  </span>
                </span>
              </span>
              <span className="dropdown-wrapper" aria-hidden="true" />
            </span>
          </div>
        </div>
        <div className="form-group">
          <div className="col-12">
            <div className="mb-3">
              <input
                type="date"
                value={date_book}
                onChange={(e) => handleChange(e)}
                name="date_book"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleOderSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}

export default DoctorHome;
