import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailDoctorById } from "../service/doctorService";
import { getListTimeByDoctorId } from "../service/TimeSlotsService";
import authHeader from "../service/auth-header";
import { oderBookings } from "../service/bookingsService";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function DetailDoctor() {
  const [doctor, setDoctor] = useState();
  const [listTimesOder, setListTimeOder] = useState();
  const [active, setActive] = useState(false);
  const [timesSlotId, setTimeSlotId] = useState();
  const { id } = useParams();
  const [bookings, setBookings] = useState({
    reason: "",
  });

  const { reason } = bookings;
  const closeBookings = (e) => {
    e.preventDefault();
    setActive(!active);
  };
  function data() {
    getDetailDoctorById(id).then((res) => {
      setDoctor(res.data);
    });
  }
  function dataTime() {
    getListTimeByDoctorId(id).then((res) => {
      if (res.data.message == "not_found") {
        alert("list booking none");
      } else {
        setListTimeOder(res.data);
      }
    });
  }
  useEffect(() => {
    data();
    dataTime();
    window.scrollTo(0, 0);
  }, [id]);
  const onInputChane = (e) => {
    setBookings({ ...bookings, [e.target.name]: e.target.value });
  };

  const handleDetail = (timesId) => {
    if (authHeader() == null) {
      toast.error("You need to login !!!", { position: toast.POSITION.TOP_CENTER });
    } else {
      setTimeSlotId(timesId);
      setActive(!active);
    }
  };
  const addNewBooking = (e) => {
    e.preventDefault();
    oderBookings(timesSlotId, bookings)
      .then((res) => {
        if (res.data.message == "access_denied_role") {
          toast.warning("your are doctor or admin can't not bookings!!!!", {
            position: toast.POSITION.TOP_CENTER,
          });
            setActive(!active);
            setBookings({reason:""})
        } else {
            setActive(!active);
            dataTime();
          setBookings({ reason: "" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    
    
  };

  return (
    <>
      {doctor == undefined ? (
        <></>
      ) : (
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
                          <p style={{ color: "black" }}>{doctor.user.name}</p>
                        </div>
                        <div className="media">
                          <label>E-mail</label>
                          <p style={{ color: "black" }}>{doctor.user.email}</p>
                        </div>
                        <div className="media">
                          <label>Roles</label>
                          <p style={{ color: "black" }}>{doctor.user.roles[0].name}</p>
                        </div>
                        <div className="media">
                          <label>Specialty</label>
                          <p style={{ color: "black" }}>{doctor.specialty.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="about-avatar">
                    <img src={doctor.user.avatar} title="" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

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
          <tbody style={{ textAlign: "center" }}>
            {listTimesOder == undefined ? (
              <></>
            ) : (
              listTimesOder.map((e, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{e.date_book}</td>
                  <td>{e.booked == true ? "Oder" : "Not Oder"}</td>
                  <td>{e.times}</td>
                  <td>
                    {e.booked == false ? (
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => handleDetail(e.id)}
                      >
                        Order
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
        <button
          type="submit"
          class="btn btn-success btn-lg"
          onClick={addNewBooking}
        >
          Booking
        </button>
        <ToastContainer transition={Zoom} />
      </div>
    </>
  );
}

export default DetailDoctor;
