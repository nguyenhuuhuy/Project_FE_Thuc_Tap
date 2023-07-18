import React, { useEffect, useState } from "react";
import "./style/doctorAdmin.css";
import { getListDoctor, putActiceDoctor, putBlockDoctor } from "../service/doctorService";

function DoctorAdmin() {
  const [listDoctor, setListDoctor] = useState();
  function listDoctorData() {
    getListDoctor().then((res) => setListDoctor(res.data));
  }
  useEffect(() => {
    listDoctorData();
  }, []);
  let element = "";
  if (listDoctor == undefined) {
    element = "";
  } else {
    console.log(listDoctor);
    element = listDoctor.map((e, index) => {
      return (
        <tr key={index} style={{ textAlign: "center" }}>
          <td>{index + 1}</td>
          <td>{e.user.name}</td>
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
  return (
    <>
      <div className="col-xs-8 col-xs-offset-2 well">
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
