import { Fragment } from "react";
import ProgressBar from "../card/progress-bar";

const StatusProgress = () => {
  return (
    <Fragment>
      <div className="bg-warning rounded-4 p-4 col-lg-10 text-light d-flex flex-column justify-content-between ">
        <div>
            <h4 className="text-start">CLOSED</h4>
        </div>
        <div>
        <div className="d-flex justify-content-between">
          <span>Swap Progress</span>
        </div>
        <div className="progress" style={{ height: "7px" }}>
          <div
            className="progress-bar bg-dark"
            role="progressbar"
            style={{ width: "100%" }}
          ></div>
          <div>
            <span style={{position:"absolute",left:"55%",marginTop:"5px"}}>0.00%</span>
            <span
              style={{
                position: "absolute",
                right: "22%",
                marginTop:"5px"
              }}
            >
              0.0000/0
            </span>
          </div>
        </div>
        </div>
      </div>
    </Fragment>
  );
};

export default StatusProgress;
