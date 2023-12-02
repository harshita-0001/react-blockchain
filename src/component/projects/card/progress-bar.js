import { Fragment } from "react";

const ProgressBar = ({participants}) => {
  return (
   <Fragment>
    <div className="d-flex justify-content-between">
        <span>Progress</span>
        <span>Participants : <b>{participants}</b></span>
      </div>
     <div className="progress" style={{height:"7px"}} >
      
      <div
        className="progress-bar"
        role="progressbar"
        style={{width: "100%"}}
      >
      </div>
      <div>
        <span style={{
            position:"absolute",
            left:"25px",
            bottom:"5px"
        }}>0.00%</span>
        <span
        style={{
            position:"absolute",
            right:"25px",
            bottom:"5px"
        }}
        >0.0000/0</span>
      </div>
    </div>
   </Fragment>
  );
};

export default ProgressBar;
