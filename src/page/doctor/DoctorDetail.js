import React, { useState, useEffect } from "react";
import "../../style/doctorDetail.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getListTimeByDoctorId } from "../../service/TimeSlotsService";
import { oderBookings } from "../../service/bookingsService";
import authHeader from "../../service/auth-header";

function DoctorDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("");
  const [listtimeSlotOder, setListTimeSlotOder] = useState([]);
  const [timesSlotId, setTimeSlotId] = useState();
  const [bookings, setBookings] = useState({
    reason: "",
  });

  const { reason } = bookings;
  const closeBookings = (e) => {
    e.preventDefault();
    setActive(!active);
  };

  var id = new Number(location.state.id);
  function getListdataTimeSlotOder() {
    getListTimeByDoctorId(id).then((res) => setListTimeSlotOder(res.data));
  }

  const handleDetail = (timesId) => {
    if (authHeader() == null) {
      alert("You need to login !!! ");
      navigate("/login");
    }
    // getTimeSlostById(timesId).then((res)=>setDetailOderTime(res.data))
    setTimeSlotId(timesId);
    setActive(!active);
  };

  const onInputChane = (e) => {
    setBookings({ ...bookings, [e.target.name]: e.target.value });
  };
  const addNewBooking = (e) => {
    e.preventDefault();
    console.log(bookings);
    console.log(timesSlotId);
    oderBookings(timesSlotId, bookings)
      .then((res) => setStatus(res.data))
      .catch((err) => {
        console.log(err);
      });
    if (status.message == 'access_denied') {
        alert("your are doctor can't not bookings!!!!")
      }
    setActive(!active);
    getListdataTimeSlotOder();
  };
  
  useEffect(() => {
    getListdataTimeSlotOder();
  }, []);

  let element = [];
  if (listtimeSlotOder.length == 0) {
    element = [];
  } else {
    element = listtimeSlotOder.map((e, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{e.date_book}</td>
          <td>{e.booked == true ? "Oder" : "Not Oder"}</td>
          <td>{e.times}</td>
          <td>
            {e.booked == false ? (
              <button type="button" class="btn btn-primary" onClick={() => handleDetail(e.id)}>
                Oder
              </button>
            ) : (
              ""
            )}
          </td>
          {/* <td>
            <button type="button" class="btn btn-success">
              Success
            </button>
          </td>
          <td>
            <button type="button" class="btn btn-danger">
              Danger
            </button>
          </td> */}
        </tr>
      );
    });
  }

  return (
    <>
      <section className="section about-section gray-bg" id="about">
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-lg-6">
              <div className="about-text go-to">
                <h3 className="dark-color">About Me</h3>

                <div className="row about-list">
                  <div className="col-md-6">
                    <div className="media">
                      <label>Name</label>
                      <p>{location.state.name}</p>
                    </div>
                    <div className="media">
                      <label>E-mail</label>
                      <p>{location.state.email}</p>
                    </div>
                    <div className="media">
                      <label>Roles</label>
                      <p>{location.state.roles}</p>
                    </div>
                    <div className="media">
                      <label>Specialty</label>
                      <p>{location.state.specialty}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-avatar">
                <img src={location.state.avatar} title="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <h2 style={{ textAlign: "center" }}>Working Time</h2>
      <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <table className="table table-bordered table-striped mb-0">
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Appointment Date</th>
              <th scope="col">Status</th>
              <th scope="col">TIME</th>
              <th scope="col" colSpan={3}>
                EDIT
              </th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>{element}</tbody>
        </table>
      </div>
      {/* {
            detailOderTime.map((e,indext)=>{
                return(
                    <div className="container bootstrap snippets bootdey" key={indext}>
                        <div className="panel-body inf-content">
                            <div className="row">
                                <div className="col-md-4">
                                    <img
                                        alt=""
                                        style={{ width: 600 }}
                                        title=""
                                        className="img-circle img-thumbnail isTooltip"
                                        src={e.user.avatar}
                                        data-original-title="Usuario"
                                    />
                                    
                                </div>
                                <div className="col-md-6">
                                    <strong>Information</strong>
                                    <br />
                                    <div className="table-responsive">
                                        <table className="table table-user-information">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span className="glyphicon glyphicon-user  text-primary" />
                                                            Name
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">{e.user.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span className="glyphicon glyphicon-envelope text-primary" />
                                                            Email
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">{e.user.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span className="glyphicon glyphicon-calendar text-primary" />
                                                            Booking Date
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">{e.date_book}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span className="glyphicon glyphicon-calendar text-primary" />
                                                            Booking Oder
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">{e.timeSlot.date_book}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span className="glyphicon glyphicon-calendar text-primary" />
                                                            Time
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">{e.timeSlot.times}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span className="glyphicon glyphicon-calendar text-primary" />
                                                            Confirm
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">{e.isConfirm}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <strong>
                                                            <span className="glyphicon glyphicon-calendar text-primary" />
                                                            Content
                                                        </strong>
                                                    </td>
                                                    <td className="text-primary">{e.reason}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        } */}

      <div className={active ? "contentBooking" : "contentBooking_close"}>
        <i className="fa-solid fa-xmark" id="closeBookings" onClick={closeBookings} />
        <div style={{ paddingTop: "5%" }}>
          <h3>Content</h3>
        </div>
        <div className="form-outline w-75 mb-4" id="bookings">
          <textarea
            className="form-control"
            id="textAreaExample6"
            rows={3}
            type="text"
            name="reason"
            value={reason}
            onChange={(e) => onInputChane(e)}
          />
        </div>
        <button type="submit" class="btn btn-success btn-lg" onClick={addNewBooking}>
          Booking
        </button>
      </div>
    </>
  );
}

export default DoctorDetail;
