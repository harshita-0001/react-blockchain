import { Fragment } from "react";
import Navbar from "../navbar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import OpenProjects from "./open";
import ProjectComingSoon from "./coming-soon";
import ProjectClosed from "./close";

const Project=()=>{
   return(
    <div className="main">
       <OpenProjects/>
       <ProjectComingSoon/>
       <ProjectClosed/>
    </div>
   )
}

export default Project;