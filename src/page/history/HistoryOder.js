import React, { useEffect, useState } from "react";
import "../../style/history.css";
import {
  getHistoryAccpetByUserId,
  getHistoryByUserId,
  getHistoryCancelByUserId,
  putCancelByBookingId,
} from "../../service/bookingsService";
import { set } from "react-hook-form";

function HistoryOder() {
  const [active, setActive] = useState();
  const [listHistory, setListHistory] = useState();
  const [listRender, setListRender] = useState();
  function getListHistoryData() {
    getHistoryByUserId().then((res) => {
      setListHistory(res.data);
    });
  }
  useEffect(() => {
    getListHistoryData();
  }, []);
  // console.log(listHistory);
  const handleChangeList = (e) => {
    let check = e.target.id;
    setActive(check);
    if (e.target.id == "all") {
      setListRender(listHistory);
    } else {
      if (listHistory.message == "not_found") {
        console.log("chua co gi");
      } else {
        const element = listHistory.filter((h) => h.isConfirm == e.target.id);
        setListRender(element);
      }
    }
  };

  let renderList = [];
  let renderListHome = [];
  if (listRender == undefined) {
    renderListHome = [];
  } else if (listRender.length > 0) {
    renderList = listRender;
    renderListHome = renderList.map((e, index) => {
      return (
        <tr key={index}>
          <td>
            <img src={e.user.avatar} alt="" style={{ width: "100px", height: "100px" }} />
            <span className="user-subhead">{e.user.name}</span>
          </td>
          <td>{e.date_book}</td>
          <td>{e.timeSlot.date_book}</td>
          <td>{e.timeSlot.times}</td>
          <td className="text-center">
            <span className="label label-default">{e.isConfirm}</span>
          </td>
          <td>
            <h6>{e.reason}</h6>
          </td>
          <td>
            <h6>{e.timeSlot.doctor.user.name}</h6>
          </td>
          <td>
            <h6>{e.timeSlot.doctor.specialty.name}</h6>
          </td>
          <td style={{ width: "20%" }}>
            {e.isConfirm == "LOADING" ? (
              <>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleCancelBooking(e.id)}
                >
                  cancel
                </button>
              </>
            ) : (
              <></>
            )}
          </td>
        </tr>
      );
    });
  }
  const handleCancelBooking = (id) => {
    putCancelByBookingId(id).then((res) => {
      if (res.data.message == "update_success") {
        alert("cancel successfully !!!");
        window.location.reload();
      }
    });
  };

  console.log(renderList);

  return (
    <>
      <div className="menu-box" style={{ marginTop: "6%", marginBottom: "10%" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-title text-center">
                <h2>History</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="special-menu text-center">
                <div className="button-group filter-button-group">
                  <button
                    data-filter="*"
                    id="all"
                    onClick={handleChangeList}
                    className={active == "all" ? "active" : "isActive"}
                  >
                    All
                  </button>
                  <button
                    data-filter=".LOADING"
                    id="LOADING"
                    onClick={handleChangeList}
                    className={active == "LOADING" ? "active" : "isActive"}
                  >
                    LOADING
                  </button>
                  <button
                    data-filter=".ACCEPT"
                    id="ACCEPT"
                    onClick={handleChangeList}
                    className={active == "ACCEPT" ? "active" : "isActive"}
                  >
                    ACCEPT
                  </button>
                  <button
                    data-filter=".NOT_ACCEPT"
                    id="NOT_ACCEPT"
                    onClick={handleChangeList}
                    className={active == "NOT_ACCEPT" ? "active" : "isActive"}
                  >
                    NOT ACCEPT
                  </button>
                  <button
                    data-filter=".CANCEL"
                    id="CANCEL"
                    onClick={handleChangeList}
                    className={active == "CANCEL" ? "active" : "isActive"}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row special-list">
            <div className="container bootstrap snippets bootdey">
              <div className="row">
                <div className="col-lg-12">
                  <div className="main-box no-header clearfix">
                    <div className="main-box-body clearfix">
                      <div className="table-responsive">
                        <table className="table user-list">
                          <thead style={{ textAlign: "center" }}>
                            <tr>
                              <th>
                                <span>User</span>
                              </th>
                              <th>
                                <span>Created</span>
                              </th>
                              <th>
                                <span>Date</span>
                              </th>
                              <th>
                                <span>Time</span>
                              </th>
                              <th className="text-center">
                                <span>Status</span>
                              </th>
                              <th>
                                <span>Content</span>
                              </th>
                              <th>
                                <span>Doctor</span>
                              </th>
                              <th>
                                <span>Cpeccialty</span>
                              </th>
                              <th>&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody style={{ textAlign: "center" }}>{renderListHome}</tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryOder;
