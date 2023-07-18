import React, { useEffect, useState } from 'react';
import "../../style/specialty.css";
// import getListSpecialty from "../../service/specialtyService";
function Specialty() {
    // const [listData,setListData] = useState([]);
    // function SpecialtyService() {
    //     getListSpecialty().then((res)=>console.log(res.data))
    // }
    // useEffect(()=>{
    //     SpecialtyService()
    // },[]);

  return (
    <>
          <section>
              <div className="container">
                  <div className="section-heading title-style4 border-bottom padding-25px-bottom sm-padding-15px-bottom">
                      <h3>
                          <span>Our</span> Services
                      </h3>
                  </div>
                  <div className="row mt-60">
                      <div className="col-lg-4 col-md-6 sm-margin-30px-bottom xs-margin-20px-bottom">
                          <div className="service-block4 h-100">
                              <div className="service-icon">
                                  <i className="icon-mobile" />
                              </div>
                              <div className="service-desc">
                                  <h4>Investment Plan</h4>
                                  <h5>Business Plan</h5>
                                  <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                      eiusmod tempor incididunt ut labore et dolore.
                                  </p>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-6 xs-margin-20px-bottom">
                          <div className="service-block4 h-100">
                              <div className="service-icon">
                                  <i className="icon-presentation" />
                              </div>
                              <div className="service-desc">
                                  <h4>Media Marketing</h4>
                                  <h5>Marketing Plan</h5>
                                  <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                      eiusmod tempor incididunt ut labore et dolore.
                                  </p>
                              </div>
                          </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-xs-12">
                          <div className="service-block4 h-100">
                              <div className="service-icon">
                                  <i className="icon-genius" />
                              </div>
                              <div className="service-desc">
                                  <h4>Finance Analysis</h4>
                                  <h5>Finance Plan</h5>
                                  <p>
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                      eiusmod tempor incididunt ut labore et dolore.
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>

    </>
  )
}

export default Specialty