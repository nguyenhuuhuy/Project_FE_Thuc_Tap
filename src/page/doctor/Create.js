import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListSpecialty } from "../../service/specialtyService";
import "../../style/create.css"
import { postCreateDoctor } from "../../service/doctorService";
function Create() {
  const [listSpecialty, setListSpecialty] = useState();
  const [createNewDoctor,setCreateNewDoctor] = useState({
    id:'',
  })
  const {specialty} = createNewDoctor;
  function specialtyData() {
    getListSpecialty().then((res) =>{
        setListSpecialty(res.data)
    });
  }
  useEffect(() => {
    specialtyData();
  }, []);
  let element = '';
  if(listSpecialty == undefined){
    element = "";
  } else {
    element = listSpecialty.map((e,index)=>{
        return (
          <option key={index} value={e.id}>
            {e.name}
          </option>
        );
    })
  }
   const handleChange = (e) => {
     setCreateNewDoctor({ ...createNewDoctor, [e.target.name]: e.target.value });
   };
   const handleSubmit = async (e) =>{
    e.preventDefault();
    let newDoctor = {
        id: createNewDoctor.id
    }
    postCreateDoctor(newDoctor).then((res)=>{
        if (res.data.message == "name_existed") {
            alert("You are registered as a doctor!!!");
        }
    })
   }

  return (
    <>
      <div className="col-12">
        <form className="form-signin">
          <h2 className="form-signin-heading">Doctor</h2>
          <select
            className="form-select col-12"
            aria-label=".form-select-lg example"
            style={{ textAlign: "center", display: "flex", justifyContent: "center" }}
            defaultValue={specialty}
            name="id"
            onChange={(e) => handleChange(e)}
          >
            {element}
          </select>
          <br></br>
          <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={handleSubmit}>
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default Create;
