import React, { useEffect } from "react";
import "../style/home.css";
import "../style/bootstrapIcon.css";
import { NavLink } from "react-router-dom";
import authHeader from "../service/auth-header";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    authHeader();
  }, []); 

  const booking = ()=>{
    navigate("/create/booking");
  }
  return (
    <>
      <main style={{ paddingTop: "6%" }}>
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-12 text-center mx-auto">
                <h2 className="mb-5" style={{ color: "black" }}>
                  Welcome Hospital
                </h2>
              </div>
              <div className="col-lg-6 col-md-6 col-12 mb-4 mb-lg-0">
                <div
                  className="featured-block d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                >
                  <NavLink to={"/doctor"}>
                    <p className="featured-block-text">
                      Doctor <strong>information</strong>
                    </p>
                  </NavLink>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 mb-4 mb-lg-0 mb-md-4">
                <div
                  className="featured-block d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
                >
                  <NavLink to={"/specialty"} className="d-block">
                    <p className="featured-block-text">
                      Specialty <strong>information</strong>
                    </p>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </section>
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={booking}>
          Booking
        </button>
      </main>
    </>
  );
}

export default Home;
