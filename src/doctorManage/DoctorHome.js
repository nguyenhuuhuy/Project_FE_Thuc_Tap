import React, { useState, useEffect } from "react";
import "../style/doctorHome.css";
import { useNavigate } from "react-router-dom";
import { getDetailDoctor } from "../service/doctorService";
import { getListOderTimesByDoctorId } from "../service/TimeSlotsService";
import {
    cancelBookingByTimeSlotId,
    getDetailBookingsByTimeSlotId,
    successBookingByTimeSlotId,
} from "../service/bookingsService";

function DoctorHome() {
    const [active, setActive] = useState(false);
    const [status,setStatus] = useState();
    const [doctor, setDoctor] = useState();
    const [listTimes, setListTimes] = useState();
    const [detailOderUser, SetDetailOderUser] = useState();
    
    const close = (e) => {
        e.preventDefault();
        setActive(!active);
    };
    function getDoctorData() {
        getDetailDoctor()
            .then((res) => setDoctor(res.data))
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        getDoctorData();
    }, []);
    const username = sessionStorage.getItem("Name_key");
    const avatar = sessionStorage.getItem("Avatar_Key");
    let element = "";
    if (doctor == undefined) {
        element = "";
    } else if (doctor != {}) {
        element = (
            <>
                <div className="tab-pane active" id="profile">
                    <p className="lead" style={{color:'black'}}>My Profile</p>
                    <hr />
                    <div className="row">
                        <div className="col-md-6">
                            <p style={{ color: 'black' }}>
                                <strong>Email: </strong>
                                {doctor.user.email}
                            </p>
                            <p style={{ color: 'black' }}>
                                <strong>Specialty: </strong>
                                {doctor.specialty.name}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                            <button className="btn btn-success">
                                <i className="fa fa-plus-circle" /> Oder Times
                            </button>
                    </div>
                </div>
            </>
        );
    }
    let renderList = "";
    const handdleListTimes = (id) => {
        getListOderTimesByDoctorId(id)
            .then((res) => setListTimes(res.data))
            .catch((err) => {
                console.log(err);
            });
    };
    if (listTimes == undefined) {
        renderList = "";
    } else {
        renderList = listTimes.map((e, index) => {
            return (
                <div className="col-md-6" key={index}>
                    <div className="timetable-item">
                        <div className="timetable-item-main">
                            <div className="timetable-item-time">{e.date_book}</div>
                            <div className="timetable-item-name">{e.times}</div>
                            {e.booked == true ? (
                                <>
                                    <button
                                        className="btn btn-primary btn-book"
                                        onClick={() => handleDetailTimeslots(e.id)}
                                    >
                                        View
                                    </button>
                                </>
                            ) : (
                                <></>
                            )}
                            <div className="timetable-item-like">
                                <div className="timetable-item-like-count">{e.id}</div>
                                <div className="timetable-item-like-count">
                                    {e.booked == true ? "oder" : "not oder"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }

    const handleDetailTimeslots = (id) => {
        setActive(!active);
        getDetailBookingsByTimeSlotId(id)
            .then((res) => SetDetailOderUser(res.data))
            .catch((err) => console.log(err));
    };
    let renderDetailOder = "";
    if (detailOderUser == undefined) {
        renderDetailOder = "";
    } else {
        renderDetailOder = detailOderUser.map((e, index) => {
            return (
                <div id={active ? "contentSubmit" : "contentSubmit_close"} key={index}>
                    <i className="fa-solid fa-xmark" id="close" onClick={close} />
                    <div className="team-single">
                        <div className="row">
                            <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                                <div className="team-single-img">
                                    <img src={e.user.avatar} alt="" style={{ width: "100px", height: "100px" }} />
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-7" style={{marginLeft:'7px'}}>
                                <div className="team-single-text padding-50px-left sm-no-padding-left">
                                    <h4 className="font-size38 sm-font-size32 xs-font-size30">User Oder</h4>
                                    <p className="no-margin-bottom">Conent: {e.reason}</p>
                                    <div className="contact-info-section margin-40px-tb">
                                        <ul className="list-style9 no-margin">
                                            <li>
                                                <div className="row">
                                                    <div className="col-md-5 col-5">
                                                        <i className="far fa-gem text-yellow" />
                                                        <strong className="margin-10px-left text-yellow">NAME:</strong>
                                                    </div>
                                                    <div className="col-md-7 col-7">
                                                        <p>{e.user.name}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div className="col-md-5 col-5">
                                                        <i className="far fa-file text-lightred" />
                                                        <strong className="margin-10px-left text-lightred">
                                                            Bokking Status:
                                                        </strong>
                                                    </div>
                                                    <div className="col-md-7 col-7">
                                                        <p>{e.isConfirm}</p>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="row">
                                                    <div className="col-md-5 col-5">
                                                        <i className="fas fa-map-marker-alt text-green" />
                                                        <strong className="margin-10px-left text-green">Oder Date:</strong>
                                                    </div>
                                                    <div className="col-md-7 col-7">
                                                        <p>{e.date_book}</p>
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
                                                        <p>{e.user.email}</p>
                                                        {/* <p>{e.timeSlot.doctor.id}</p> */}
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div >
                                                    {e.isConfirm == "ACCEPT" ? (
                                                        <></>
                                                    ) : (
                                                        <>
                                                            <button
                                                                type="submit"
                                                                class="btn btn-primary btn-lg"
                                                                onClick={() => successOder(e.id)}
                                                            >
                                                                Confirm
                                                            </button>
                                                            <button
                                                                type="button"
                                                                    class="btn btn-danger btn-lg"
                                                                style={{ marginLeft: "10px" }}
                                                                    onClick={() =>accessDenied(e.id,e.timeSlot.doctor.id)}
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}
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
            );
        });
    }

    const successOder = (id) => {
        successBookingByTimeSlotId(id).then((res) => console.log(res.data));
        setActive(!active);
    };
    const accessDenied = (id, doctorId) =>{
        console.log(id);
        console.log(doctorId);
        cancelBookingByTimeSlotId(id).then((res)=>{
            if (res.data.message == "update_success") {
                getListOderTimesByDoctorId(doctorId)
                    .then((res) => setListTimes(res.data))
                    .catch((err) => {
                        console.log(err);
                    });
                setActive(!active);
            }
        });
    }
    return (
        <>
            <div className="container bootstrap snippets bootdey">
                <div className="row">
                    {/* BEGIN USER PROFILE */}
                    <div className="col-md-12">
                        <div className="grid profile">
                            <div className="grid-header">
                                <div className="col-xs-2">
                                    <img
                                        src={avatar}
                                        className="img-circle"
                                        alt=""
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                </div>
                                <div className="col-xs-7">
                                    <h3>{username}</h3>
                                </div>
                            </div>
                            <div className="grid-body">
                                <ul className="nav nav-tabs">
                                    <li className="active">
                                        <a href="#profile" data-toggle="tab" className="btn btn-info">
                                            Profile
                                        </a>
                                    </li>
                                    <li className="active" style={{marginLeft:'10px'}}>
                                        <button
                                            href="#timeline"
                                            data-toggle="tab"
                                            className="btn btn-info"
                                            onClick={() => handdleListTimes(doctor.id)}
                                        >
                                            Timeline
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    {/* BEGIN PROFILE */}
                                    {element}
                                    {/* END PROFILE */}
                                    {/* BEGIN TIMELINE */}
                                    <div className="tab-pane" id="timeline">
                                        <p className="lead">My Timeline</p>
                                        <hr />
                                        <div className="idance">
                                            <div className="schedule content-block">
                                                <div className="container">
                                                    <div className="timetable">
                                                        {/* Schedule Top Navigation */}
                                                        <div className="tab-content">
                                                            <div className="tab-pane show active">
                                                                <div className="row">
                                                                    {/* Schedule Item 1 */}
                                                                    {renderList}
                                                                    {/* Schedule Item 2 */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* END TIMELINE */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END USER PROFILE */}
                </div>
            </div>
            {renderDetailOder}
        </>
    );
}

export default DoctorHome;
