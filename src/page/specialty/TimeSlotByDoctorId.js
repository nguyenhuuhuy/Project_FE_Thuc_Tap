import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListTimeByDoctorId } from "../../service/TimeSlotsService";
import authHeader from "../../service/auth-header";
import { oderBookings } from "../../service/bookingsService";

function TimeSlotByDoctorId() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [listTimes, setListTimes] = useState();
  const [active, setActive] = useState(false);
  const [timesSlotId, setTimeSlotId] = useState();
  const [bookings, setBookings] = useState({
    reason: "",
  });
  const { reason } = bookings;
  const onInputChane = (e) => {
    setBookings({ ...bookings, [e.target.name]: e.target.value });
  };
  const closeBookings = (e) => {
    e.preventDefault();
    setActive(!active);
  };
  function listTimesData() {
    getListTimeByDoctorId(id).then((res) => {
      setListTimes(res.data);
    });
  }
  useEffect(() => {
    listTimesData();
  }, []);

  const handleDetail = (timesId) => {
    if (authHeader() == null) {
      alert("You need to login !!! ");
      navigate("/login");
    }
    setTimeSlotId(timesId);
    setActive(!active);
  };

  const addNewBooking = (e) => {
    e.preventDefault();
    oderBookings(timesSlotId, bookings)
      .then((res) => {
        if (res.data.message == "access_denied_role") {
          alert("your are doctor or admin can't not bookings!!!!");
        } else {
          alert("Create Success!!!!");
          setActive(!active);
          listTimesData();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(status);
  return (
    <>
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
            {listTimes == undefined ? (
              <></>
            ) : (
              listTimes.map((e, index) => (
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
                        Oder
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
        <button type="submit" class="btn btn-success btn-lg" onClick={addNewBooking}>
          Booking
        </button>
      </div>
    </>
  );
}

export default TimeSlotByDoctorId;
