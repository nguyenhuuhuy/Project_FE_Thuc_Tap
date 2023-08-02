import React from "react";
import "../../style/err.css";
import {useNavigate} from "react-router-dom";
function Err404() {
    const navigate = useNavigate();
  return (
    <>
      <meta charSet="utf-8"/>
      <title>404</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Roboto:400" rel="stylesheet" />
      <div className="grid">
        <div className="grid__row">
          <div className="grid__col">
            <div className="box animation animation--shake--vertical">4</div>
          </div>
          <div className="grid__col">
            <div className="box animation animation--reverse animation--shake--vertical">0</div>
          </div>
          <div className="grid__col">
            <div className="box animation animation--shake--vertical">4</div>
          </div>
        </div>
        <div style={{marginBottom:'4%',marginTop:'2%',marginLeft:'40%'}} onClick={()=>{navigate("/")}}>
          <button className="custom-btn btn-2">Go Home</button>
        </div>
      </div>
    </>
  );
}

export default Err404;
