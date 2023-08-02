import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from "react-router-dom";
import { getDetailSpecialtyById } from '../service/specialtyService';
function DetailSpecialty() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [specialty,setSpecialty] = useState();
    function data() {
        getDetailSpecialtyById(id).then((res)=>{
            setSpecialty(res.data);
        })
    }
    useEffect(()=>{
        data();
    },[id])
   
    const handleDetail = (id) => {
      navigate(`/specialty/${id}`);
    };
  return (
    <>
      <section style={{ paddingTop: "7%" }}>
        <div className="container">
          <div className="section-heading title-style4 border-bottom padding-25px-bottom sm-padding-15px-bottom">

          </div>
          <div className="row mt-60">
            {specialty == undefined ? (
              <></>
            ) : (
              <>
                <div
                  className="col-lg-4 col-md-6 sm-margin-30px-bottom xs-margin-20px-bottom"
                  style={{ marginBottom: "1%" }}
                >
                  <div className="service-block4 h-100">
                    <div className="service-icon">
                      <i className="icon-mobile" />
                    </div>
                    <div className="service-desc">
                      <button style={{ border: "none" }} onClick={() => handleDetail(specialty.id)}>
                      {specialty.name}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default DetailSpecialty