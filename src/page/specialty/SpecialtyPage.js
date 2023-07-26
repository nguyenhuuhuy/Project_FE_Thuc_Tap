import React, { useEffect, useState } from 'react';
import "../../style/specialty.css";
import { getListSpecialty } from '../../service/specialtyService';

function SpecialtyPage() {
    const [listData,setListData] = useState();
    function SpecialtyData() {
       getListSpecialty().then((res)=>{
        setListData(res.data);
       })
    }
    useEffect(()=>{
        SpecialtyData();
    },[]);
    let render = null;
    if (listData == undefined) {
        render = null;
    } else {
        render = listData.map((e,index)=>{
            return (
              <div className="col-lg-4 col-md-6 sm-margin-30px-bottom xs-margin-20px-bottom" key={index} style={{marginBottom:'1%'}}>
                <div className="service-block4 h-100" >
                  <div className="service-icon">
                    <i className="icon-mobile" />
                  </div>
                  <div className="service-desc">
                    <button style={{border:'none'}} onClick={()=>handleClick(e.id)}>{e.name}</button>
                    <h5></h5>
                  </div>
                </div>
              </div>
            );
        })
    }
    const handleClick = (id) =>{
        console.log(id);
    }
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
                    {render}
                  </div>
              </div>
          </section>

    </>
  )
}

export default SpecialtyPage