import React from 'react';
import logo from './logo.svg';
import './App.css';
import Connect from './component/connect/card';
import MultiSender from './component/connect/multiSender';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from './component/navbar/navbar';
import { Route, Routes } from 'react-router-dom';
import Project from './component/projects';
import DetailProject from './component/projects/detail-project';
import ProjectDetailTable from './component/projects/detail-project/table/project-detail/commom-table';
function App() {
  return (
    <div className="App">
       <div>
       <Navbar/>
         {/* <MultiSender/> */}
         <Routes>
              <Route path='/' element={<MultiSender/>}></Route>
              <Route path='/projects' element={<Project/>}></Route>
              <Route path='/projects/:id' element={<DetailProject/>}></Route>
              <Route path='/project-detail' element={<ProjectDetailTable/>}></Route>
         </Routes>
       </div>
    </div>
  );
}

export default App;
