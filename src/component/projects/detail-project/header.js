const Header = ({projectData,setProjectData}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light col-lg-8 m-auto">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" onClick={()=>setProjectData("project")}>
                    Project Details
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setProjectData("schedule")}>
              Schedule
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={()=>setProjectData("allocation")}>
              Your Allocation
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
