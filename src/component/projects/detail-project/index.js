import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { data } from "../data/data";
import Detail from "./detail";
import StatusProgress from "./status-progress";
import Header from "./header";
import DetailInTable from "./table";

const DetailProject=()=>{
    const {id}=useParams();
    const[projectData,setProjectData]=useState("project")
    const filteredData=data.find(val=>val.address===id);
    return(
      <Fragment>
          <div className="d-flex bg-light col-lg-8 m-auto col-md-6 col-sm-6 flex-wrap">
                    <div className="col-lg-6 col-md-12 col-sm-12 bg-light p-3 py-5">
                                <Detail detail={filteredData}/>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                                <StatusProgress detail={filteredData}/>
                    </div>
          </div>
          <div>
                    <Header projectData={projectData} setProjectData={setProjectData}/>
          </div>
          <div className="d-flex bg-light col-lg-8 m-auto"  >
                    <DetailInTable projectData={projectData} detail={filteredData}/>
          </div>

      </Fragment>
    )
}

export default DetailProject;