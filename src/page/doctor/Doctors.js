import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCheckListDoctor, getListDoctor } from '../../service/doctorService';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "../../style/doctors.css";
function Doctors() {
    const navigate = useNavigate();
    const [listDoctor, setListDoctor] = useState();
    function getDataListDoctor() {
        getCheckListDoctor().then((res) => setListDoctor(res.data))
    }
    useEffect(() => {
        getDataListDoctor();
    }, []);
    let element = [];
    if (listDoctor == undefined) {
    } else {
        element = listDoctor.map((e, index) => {
            return (
                <tr className="inner-box" key={index}>

                    <td>
                        <div className="event-img">
                            <img
                                src={e.user.avatar}
                                alt=""
                            />
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
                                <div className="categories" style={{ marginLeft: '10px' }}>
                                    <h6>{e.user.roles[0].name}</h6>
                                </div>

                            </div>
                        </div>
                    </td>
                    <td>
                        <div className="r-no">
                            <span>{e.specialty.name}</span>
                        </div>
                    </td>
                    <td>
                        <div className="primary-btn">
                            <button className="custom-btn btn-13" onClick={() => navigate({
                                pathname: "/doctorDetail",
                                search: `?id=${e.id}`,
                            }, {
                                state: {
                                    name: `${e.user.name}`,
                                    email: `${e.user.email}`,
                                    avatar: `${e.user.avatar}`,
                                    specialty: `${e.specialty.name}`,
                                    roles: `${e.user.roles[0].name}`,
                                    id: `${e.id}`
                                }
                            })}>View More</button>
                        </div>
                    </td>
                </tr>
            )
        })
    }
    return (
        <>
            <div className="event-schedule-area-two bg-color pad100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center">
                                <div className="title-text">
                                    <h2>List Doctor</h2>
                                </div>
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
                                            <tbody>
                                                {element}
                                            </tbody>
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
    )
}

export default Doctors