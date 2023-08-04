import React from "react";
import { useParams } from "react-router-dom";
import { getListDoctorBySpecialtyId } from "../../service/doctorService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorBySpecialtyId() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [listDoctor, setListDoctor] = useState();
  function getListDataDoctorBySpecialtyId() {
    getListDoctorBySpecialtyId(id).then((res) => {
      setListDoctor(res.data);
    });
  }
  useEffect(() => {
    getListDataDoctorBySpecialtyId();
  }, []);
  const handleDetail = (id) => {
    navigate(`/specialty/doctor/${id}`)
  };
  return (
    <>
      <div className="container bootstrap snippets bootdey" style={{paddingTop:'10%'}}>
        <div className="row">
          <div className="col-lg-12">
            <div className="main-box no-header clearfix">
              <div className="main-box-body clearfix">
                <div className="table-responsive">
                  <table className="table user-list">
                    <thead>
                      <tr>
                        <th>
                          <span>User</span>
                        </th>
                        <th>
                          <span>Created</span>
                        </th>
                        <th>
                          <span>Email</span>
                        </th>
                        <th>
                          <span>acceptance</span>
                        </th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listDoctor == undefined ? (
                        null
                      ) : (
                        listDoctor.map((e, index) => (
                          <tr key={index}>
                            <td>
                              <img
                                src={e.user.avatar}
                                alt=""
                                style={{ width: "100xp", height: "100px" }}
                              />
                              <h6>{e.user.name}</h6>
                            </td>
                            <td>{e.specialty.name}</td>
                            <td>
                              <a href="#">{e.user.email}</a>
                            </td>
                            <td>{e.work == true ? "Appect" : "Loading"}</td>
                            <td className="text-center">
                              <span className="label label-default">
                                {e.work == true ? (
                                  <>
                                    <button
                                      type="button"
                                      className="btn btn-info"
                                      onClick={() => handleDetail(e.id)}
                                    >
                                      View
                                    </button>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorBySpecialtyId;
