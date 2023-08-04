import React, { useEffect, useState } from "react";
import "../style/detailUser.css";
import { Navigate } from "react-router-dom";
import { getDetailUser, putUpdateuser } from "../service/userSrevices";
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
function DetailUser() {
  const NAME_KEY = "Name_key";
  const AVATAR_KEY = "Avatar_Key";
  const [active,setActive] = useState(false);
  const [updateUser, setUpdateUser] = useState({
    name: "",
    avatar: "",
  });
  const [detailUser, setDetailUser] = useState([]);
  function detailUserData() {
    getDetailUser().then((res) => {
      setDetailUser(res.data);
    });
  }
  useEffect(() => {
    detailUserData();
  }, []);
  const handleOnchange = (e)=>{
    let imgaeUpload = e.target.files[0];
     if (imgaeUpload == null) return;
     const imageRef = ref(storage, `iamge/${imgaeUpload.name + v4()}`);
     uploadBytes(imageRef, imgaeUpload).then((sp) => {
       getDownloadURL(sp.ref).then((url) => {
         setUpdateUser({ ...updateUser, avatar: url });
       });
     });
  }

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, name: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let obj = {
      name:updateUser.name,
      avatar:updateUser.avatar,
    }
    putUpdateuser(obj).then((res)=>{
      detailUserData();
      sessionStorage.setItem(NAME_KEY, obj.name);
      sessionStorage.setItem(AVATAR_KEY, obj.avatar);
      window.location.reload();
      setActive(!active)
    })
    
  };

  const clickTest = () =>{
    
clickInput()
   
  }
  const clickInput = ()=>{
    console.log(1);
  }
  return (
    <>
      {detailUser == undefined ? (
        <></>
      ) : (
        <>
          <div
            className={active == true ? "model_Update container" : "model_Update_Close container"}
          >
            <div className="row" style={{ justifyContent: "center", marginTop: "15%" }}>
              <div className="col-6">
                <div className="card">
                  <div className="card-body">
                    <i
                      className="fa-solid fa-circle-xmark"
                      style={{ fontSize: "30px", paddingLeft: "94%", paddingBottom: "1%" }}
                      onClick={() => {
                        setActive(!active);
                      }}
                    ></i>
                    <form
                      onSubmit={(e) => {
                        onSubmit(e);
                      }}
                    >
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">New Name</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) => handleChange(e)}
                            required
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-3">
                          <h6 className="mb-0">New Avatar</h6>
                        </div>
                        <div className="col-sm-9 text-secondary">
                          <input type="file" onChange={handleOnchange} required />
                        </div>
                      </div>
                      {updateUser.avatar == "" ? (
                        <></>
                      ) : (
                        <>
                          <img
                            src={updateUser.avatar}
                            style={{
                              width: "70px",
                              height: "70px",
                              borderRadius: "50%",
                              marginLeft: "30%",
                            }}
                          />
                        </>
                      )}

                      <div className="row">
                        <div className="col-sm-3" />
                        <div className="col-sm-9 text-secondary">
                          <br />
                          <button type="submit" className="btn btn-info">
                            Update
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="container bootstrap snippets bootdey"
            style={{ marginBottom: "5%", marginTop: "10%" }}
          >
            <div className="panel-body inf-content">
              <div className="row">
                <div className="col-md-4">
                    <img
                      alt=""
                      style={{ width: 600 }}
                      title=""
                      className="img-circle img-thumbnail isTooltip"
                      src={detailUser.avatar}
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
                          <td className="text-primary">{detailUser.name}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-envelope text-primary" />
                              Email
                            </strong>
                          </td>
                          <td className="text-primary">{detailUser.email}</td>
                        </tr>
                        <tr>
                          <td>
                            <strong>
                              <span className="glyphicon glyphicon-envelope text-primary" />
                            </strong>
                          </td>
                          <td className="text-primary">
                            <button
                              type="button"
                              className="btn btn-info"
                              onClick={() => {
                                setActive(!active);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DetailUser;
