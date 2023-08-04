import React, { useEffect, useState } from "react";
import { getListSpecialty } from "../service/specialtyService";
import { getListDoctorBySpecialtyId } from "../service/doctorService";
import { getListOderTimesByDoctorId } from "../service/TimeSlotsService";
import { oderBookings } from "../service/bookingsService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateBooking() {
  const navigate = useNavigate();
  const [listSpecialty, setListSpecialty] = useState();
  const [clickListDoctor, setClickListDoctor] = useState({
    specialty:"",
  });
  const [listDoctor, setListDoctor] = useState();
  const [listTimes, setListTime] = useState();
  const [oderTimeId, setOderTimeId] = useState({
    id: "",
  });
  const { content } = oderTimeId;
  function getListSpecialtyData() {
    getListSpecialty().then((res) => {
      setListSpecialty(res.data);
    });
  }
  useEffect(() => {
    getListSpecialtyData();
  }, []);

  let renderListSpecialty = null;
  if (listSpecialty == undefined) {
    renderListSpecialty = null;
  } else {
    renderListSpecialty = listSpecialty.map((e, index) => {
      return (
        <option key={index} value={e.id}>
          {e.name}
        </option>
      );
    });
  }

  const handleChange = (e) => {
    setClickListDoctor({ ...clickListDoctor, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  const handleRenderDoctor = ()=>{
    if (clickListDoctor.specialty == "DEFAULT") {
      console.log(1);
    } else {
      getListDoctorBySpecialtyId(clickListDoctor.specialty)
        .then((res) => {
          setListDoctor(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }


  let renderListDoctorbySpecialtyId = null;
  if (listDoctor == undefined) {
    renderListDoctorbySpecialtyId = null;
  } else {
    renderListDoctorbySpecialtyId = listDoctor.map((e, index) => {
      return (
        <option key={index} value={e.id}>
          {e.user.name}
        </option>
      );
    });
  }
  const handleChangeDoctor = (e) => {
    if (e.target.value == "DEFAULT") {
      console.log(1);
    } else {
      getListOderTimesByDoctorId(e.target.value).then((res) => {
        if (res.data.message == "not_found") {
          toast.warning("No empty calendar!!!!", {
            position: toast.POSITION.TOP_CENTER,
          });
          setListTime();
        } else {
          setListTime(res.data);
        }
      });
    }
    
  };
  let renderListTimes = null;
  if (listTimes == undefined) {
    renderListTimes = null;
  } else {
    renderListTimes = listTimes.map((e, index) => {
      return (
        <option key={index} value={e.id} disabled={e.booked == true ? "hidden" : ""}>
          {e.date_book} {e.times}
        </option>
      );
    });
  }
  const handleChangeTimesId = (e) => {
    setOderTimeId({ ...oderTimeId, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let newOder = {
      reason: oderTimeId.content,
    };
    oderBookings(oderTimeId.id, newOder)
      .then((res) => {
        if (res.data.message == "create_success") {
           toast("create success !!!!", {
             position: toast.POSITION.TOP_CENTER,
           });
          navigate("/");
        } else if (res.data.message == "access_denied") {
          toast.warning("you need to login !!!", { position: toast.POSITION.TOP_CENTER });
          navigate("/login");
        } else if (res.data.message == "access_denied_role") {
          toast.error("your are doctor or admin can't not bookings!!!!", {
            position: toast.POSITION.TOP_CENTER,
          });

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="col-12" style={{ paddingTop: "10%" }}>
        <div className="row" style={{ justifyContent: "center" }}>
          <div className="col-6">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <h2 style={{ textAlign: "center" }}>Booking</h2>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Specialty</label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="specialty"
                  defaultValue={"DEFAULT"}
                  onChange={(e) => handleChange(e)}
                  required
                >
                  <option  disabled={"disabled"} value="DEFAULT">
                    Open this select specialty
                  </option>
                  {renderListSpecialty}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlSelect2">Doctor</label>
                <select
                  multiple=""
                  className="form-control"
                  id="exampleFormControlSelect2"
                  name="idTimes"
                  defaultValue={"DEFAULT"}
                  onChange={(e) => handleChangeDoctor(e)}
                  onClick={() => handleRenderDoctor()}
                  required
                >
                  <option  value="DEFAULT">
                    Open this select Doctor
                  </option>
                  {renderListDoctorbySpecialtyId}
                </select>
              </div>
              <label htmlFor="exampleFormControlSelect2">Times</label>
              <div className="form-group">
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  name="id"
                  onChange={(e) => handleChangeTimesId(e)}
                  defaultValue={"DEFAULT"}
                  required
                >
                  <option disabled={"disabled"} value="DEFAULT" >
                    Open this select menu
                  </option>
                  {renderListTimes}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Content</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  defaultValue={content}
                  name="content"
                  onChange={(e) => handleChangeTimesId(e)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success btn-lg btn-block">
                Booking
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer transition={Zoom} />
    </>
  );
}

export default CreateBooking;
