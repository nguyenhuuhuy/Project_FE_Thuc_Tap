import React, { useEffect, useState } from "react";
import "./style/doctorAdmin.css";
import { getDetailUserById, getListUser, getSearchUserByName, putBlockUserById,getPageUser } from "../service/userSrevices";
function UsersAdmin() {
  const [listUsers, setListUser] = useState();
  const [detailUserById, setDetailUserById] = useState();
  const [searchUser,setSearchUser] = useState({search: ""});
  function dataUser() {
    getListUser().then((res) => {
      setListUser(res.data);
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    dataUser();
  }, []);
  let renderUser = null;
  if (listUsers == undefined) {
    renderUser = null;
  } else {
    renderUser = listUsers.map((e, index) => {
      return (
        <tr style={{ textAlign: "center" }} key={index}>
          <td>1</td>
          <td style={{ objectFit: "cover" }}>
            <img src={e.avatar} style={{ width: "100px", height: "100px" }} />
          </td>
          <td>
            <a href="#" onClick={()=>handleDetailUser(e.id)}>{e.name}</a>
          </td>
          <td>
            {e.status == false ? (
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
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={() => handleBlockUser(e.id)}
            >
              Block
            </button>
          </td>
        </tr>
      );
    });
  }

  const handleBlockUser = (userId) => {
    putBlockUserById(userId)
      .then((res) => {
        if (res.data.message == "block_success") {
          alert("Block success!!!");
          dataUser();
        }else if (res.data.message == "un_block_success") {
          alert("Un Block success!!!");
          dataUser();
        } else if (res.data.message == "access_denied") {
          alert("Admin not block!!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleInputChange = (e) =>{
    setSearchUser({ ...searchUser, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) =>{
     e.preventDefault();
     let searchUsers = {
       search: searchUser.search,
     };
     getSearchUserByName(searchUsers.search)
     .then((res)=>{
        if (res.data.message == "not_found") {
          alert("user not found !!!");
          dataUser();
        } else {
          setListUser(res.data);
        }
     })
     .catch((err)=>{
      alert("user not found !!!");
      dataUser();
     })
  }


   const handleDetailUser = (userId) => {
     getDetailUserById(userId).then((res) => {
       setDetailUserById(res.data);
     });
   };
   let rederDetailUser = "";
   if (detailUserById == undefined) {
     rederDetailUser = "";
   } else {
     rederDetailUser = (
       <>
         <div className="container" style={{ marginTop: "5%" }}>
           <div className="team-single">
             <div className="row">
               <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                 <div className="team-single-img">
                   <img src={detailUserById.avatar} alt="" />
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
                             <h6>{detailUserById.name}</h6>
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
                             <h6>{detailUserById.email}</h6>
                           </div>
                         </div>
                       </li>
                       <li>
                         <div className="row">
                           <div className="col-md-5 col-5">
                             <i className="fas fa-map-marker-alt text-green" />
                             <strong className="margin-10px-left text-green">Status:</strong>
                           </div>
                           <div className="col-md-7 col-7">
                             <h6>{detailUserById.status == false ? "open" : "close"}</h6>
                           </div>
                         </div>
                       </li>
                       <li>
                         <div className="row">
                           <div className="col-md-5 col-5">
                             <i class="fa-solid fa-user"></i>
                             <strong className="margin-10px-left text-green">Role:</strong>
                           </div>
                           <div className="col-md-7 col-7">
                             <h6>{detailUserById.roles[0].name}</h6>
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

  return (
    <>
      {rederDetailUser}
      <div className="col-12" >
        <div
          className="col-xs-8 col-xs-offset-2 well"
          style={{ marginBottom: "50%",marginTop:'10%' }}
        >
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
              name="search"
              onChange={(e) => handleInputChange(e)}
              required
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
          <table className="table table-scroll table-striped" style={{marginBottom:'200px'}}>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>#</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody style={{ height: "500px" }}>
              {renderUser}
              </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UsersAdmin;
