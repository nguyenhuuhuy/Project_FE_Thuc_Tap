import React, { useEffect, useState } from "react";
import "../../style/history.css";
import { getHistoryAccpetByUserId, getHistoryByUserId, getHistoryCancelByUserId, putCancelByBookingId } from "../../service/bookingsService";
import { set } from "react-hook-form";

function HistoryOder() {
  const [listDataOderByUser, setListDataOderByUser] = useState([]);
  const [listDataCancelByUser, setListDataCancelByUser] = useState([]);
  const [listDataAcceptByUser, setListDataAcceptByUser] = useState([]);
  const [status,setStatus] = useState([]);


  let elementOder = [];
  let elementCancel = [];
  let elementAccept = [];
  if (listDataOderByUser.length > 0) {
    elementOder = listDataOderByUser.map((e, index) => {
      return (
        <tr className="inner-box" key={index}>
          <td>
            <div className="event-img">
              <img src={e.user.avatar} alt="" />
            </div>
          </td>
          <td>
            <div className="event-wrap">
              <h3>
                <a href="#">{e.user.name}</a>
              </h3>
              <div className="meta">
                <div className="organizers">
                  <h6>{e.user.email}</h6>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="r-no">
              <span>{e.isConfirm}</span>
            </div>
          </td>
          <td>
            <div className="r-no">
              <span>{e.reason}</span>
            </div>
          </td>
          <td>
            <div className="primary-btn">
              <button className="custom-btn btn-13" onClick={()=>handleCanCelBooking(e.id)}>Cancel</button>
            </div>
          </td>
        </tr>
      );
    });
  }
  const handleCanCelBooking = (id)=>{
    putCancelByBookingId(id).then((res)=>{
      if (res.data.message == "update_success") {
        setStatus(res.data);
        window.location.reload();
      }
    })
  }


  if (listDataCancelByUser.length>0) {
    elementCancel = listDataCancelByUser.map((e,index)=>{
      return (
        <tr className="inner-box" key={index}>
          <td>
            <div className="event-img">
              <img src={e.user.avatar} alt="" />
            </div>
          </td>
          <td>
            <div className="event-wrap">
              <h3>
                <a href="#">{e.user.name}</a>
              </h3>
              <div className="meta">
                <div className="organizers">
                  <h6>{e.user.email}</h6>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="r-no">
              <span>{e.isConfirm}</span>
            </div>
          </td>
          <td>
            <div className="r-no">
              <span>{e.reason}</span>
            </div>
          </td>
        </tr>
      );
    })
  }
   
  if (listDataAcceptByUser.length > 0) {
    elementAccept = listDataAcceptByUser.map((e, index) => {
      return (
        <tr className="inner-box" key={index}>
          <td>
            <div className="event-img">
              <img src={e.user.avatar} alt="" />
            </div>
          </td>
          <td>
            <div className="event-wrap">
              <h3>
                <a href="#">{e.user.name}</a>
              </h3>
              <div className="meta">
                <div className="organizers">
                  <h6>{e.user.email}</h6>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div className="r-no">
              <span>{e.isConfirm}</span>
            </div>
          </td>
          <td>
            <div className="r-no">
              <span>{e.reason}</span>
            </div>
          </td>
        </tr>
      );
    })
  }
  const handleLoading = () =>{
    getHistoryByUserId().then((res) => setListDataOderByUser(res.data));
  }
  const handleCloseLoading = () =>{
    setListDataOderByUser([]);
  }

  const handleCanCel = ()=>{
    getHistoryCancelByUserId().then((res) => setListDataCancelByUser(res.data));
  }
  const handleCloseCancel = () =>{
    setListDataCancelByUser([]);
  }
  const handleAccept = () =>{
    getHistoryAccpetByUserId().then((res)=>setListDataAcceptByUser(res.data));
  }
  const handleAcceptCancel = () =>{
    setListDataAcceptByUser([]);
  }
  return (
    <>
      <div className="event-schedule-area-two bg-color pad100">
        <h2 style={{ color: "red", textAlign: 'center' }}>{status.message}</h2>
        <div className="container">
          <div className="row">
            <div className="col-lg-12" style={{display:'flex',justifyContent:'center'}}>
              <div className="section-title text-center">
                <button className="btn btn-primary" onClick={handleLoading}>
                  <div className="title-text" style={{ fontSize: "40px" }}>SHOW LIST ODER</div>
                </button>
                
              </div>
              <div className="section-title text-center" style={{marginLeft:'10px'}}>
                <button className="btn btn-primary" onClick={handleCloseLoading}>
                  <div className="title-text" style={{ fontSize: "40px"}}>CLOSE</div>
                </button>
              </div>
            </div>
            {/* /.col end*/}
          </div>
          {/* row end*/}
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade active show" id="home" role="tabpanel">
                  <div className="table-responsive">
                    <table className="table">
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th>Avatar</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Content</th>
                          <th>Edit</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>{elementOder}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* /col end*/}
          </div>
          {/* /row end*/}
        </div>
      </div>

      <div className="event-schedule-area-two bg-color pad100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="section-title text-center">
                <button className="btn btn-primary" onClick={handleCanCel}>
                  <div className="title-text" style={{ fontSize: "40px" }}>SHOW LIST CANCEL </div>
                </button>

              </div>
              <div className="section-title text-center" style={{ marginLeft: '10px' }}>
                <button className="btn btn-primary" onClick={handleCloseCancel}>
                  <div className="title-text" style={{ fontSize: "40px" }}>CLOSE</div>
                </button>
              </div>
            </div>
            {/* /.col end*/}
          </div>
          {/* row end*/}
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade active show" id="home" role="tabpanel">
                  <div className="table-responsive">
                    <table className="table">
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th>Avatar</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Content</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>{elementCancel}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* /col end*/}
          </div>
          {/* /row end*/}
        </div>
      </div>
      <div className="event-schedule-area-two bg-color pad100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="section-title text-center">
                <button className="btn btn-primary" onClick={handleAccept}>
                  <div className="title-text" style={{ fontSize: "40px" }}>SHOW LIST ACCEPT </div>
                </button>

              </div>
              <div className="section-title text-center" style={{ marginLeft: '10px' }}>
                <button className="btn btn-primary" onClick={handleAcceptCancel}>
                  <div className="title-text" style={{ fontSize: "40px" }}>CLOSE</div>
                </button>
              </div>
            </div>
            {/* /.col end*/}
          </div>
          {/* row end*/}
          <div className="row">
            <div className="col-lg-12">
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade active show" id="home" role="tabpanel">
                  <div className="table-responsive">
                    <table className="table">
                      <thead style={{ textAlign: "center" }}>
                        <tr>
                          <th>Avatar</th>
                          <th>Name</th>
                          <th>Status</th>
                          <th>Content</th>
                        </tr>
                      </thead>
                      <tbody style={{ textAlign: "center" }}>{elementAccept}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* /col end*/}
          </div>
          {/* /row end*/}
        </div>
      </div>
    </>
  );
}

export default HistoryOder;
