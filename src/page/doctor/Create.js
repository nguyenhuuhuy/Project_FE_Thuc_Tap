import React, { useEffect, useState } from "react";
import { getListSpecialty } from "../../service/specialtyService";
import "../../style/create.css";
import { postCreateDoctor } from "../../service/doctorService";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
function Create() {
  const navigate = useNavigate();
  const [listSpecialty, setListSpecialty] = useState();
  const [createNewDoctor, setCreateNewDoctor] = useState({
    id: "",
  });
  function specialtyData() {
    getListSpecialty().then((res) => {
      setListSpecialty(res.data);
    });
  }
  useEffect(() => {
    specialtyData();
  }, []);
  
  const handleChange = (e) => {
    setCreateNewDoctor({ ...createNewDoctor, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newDoctor = {
      id: createNewDoctor.id,
    };
    postCreateDoctor(newDoctor).then((res) => {
      if (res.data.message == "name_existed") {
        toast.warning("You are registered as a doctor!!!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
         toast("Create doctor success!!!!", {
           position: toast.POSITION.TOP_CENTER,
         });
         navigate('/')
      }

    });
  };

  return (
    <>
      <div className="col-12" style={{ paddingTop: "10%" }}>
        <form
          className="form-signin"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h2 className="form-signin-heading">Doctor</h2>
          <select
            className="form-select col-12"
            style={{ textAlign: "center", display: "flex", justifyContent: "center" }}
            name="id"
            onChange={(e) => handleChange(e)}
            required
          >
            <option selected disabled={"disabled"} value={""}>
              Open this select Specialty
            </option>
            {listSpecialty == undefined ? (
              <></>
            ) : (
              listSpecialty.map((e, index) => (
                <option key={index} value={e.id}>
                  {e.name}
                </option>
              ))
            )}
          </select>
          <br></br>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Create
          </button>
        </form>
      </div>
      <ToastContainer transition={Zoom} />
    </>
  );
}

export default Create;
