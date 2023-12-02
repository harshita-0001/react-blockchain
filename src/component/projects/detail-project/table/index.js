import { Fragment } from "react";
import PoolInfo from "./project-detail/pool-info";
import TokenInfo from "./project-detail/token-info";
import ScheduleTable from "./schedule";
import AllocationTable from "./allocation";

const DetailInTable = ({ projectData ,detail}) => {
  return (
    <Fragment>
      {projectData == "project" && (
        <>
          <div className="col-lg-6 bg-light">
            <PoolInfo detail={detail}/>
          </div>
          <div className="col-lg-6 bg-light">
            <TokenInfo detail={detail}/>
          </div>
        </>
      )}
      {
        projectData=="schedule" &&
        <div className="col-lg-6 bg-light">
            <ScheduleTable/>
          </div>
       
      }
      {
        projectData=="allocation" &&
        <div className="col-lg-12 bg-light">
            <AllocationTable/>
          </div>
       
      }
    </Fragment>
  );
};

export default DetailInTable;
