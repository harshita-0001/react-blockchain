import React from 'react';
import logo from './logo.svg';
import './App.css';
import Connect from './component/connect/card';
import MultiSender from './component/connect/multiSender';

function App() {
  return (
    <div className="App">
       <div>
         {/* <Connect/> */}
         <MultiSender/>
       </div>
    </div>
  );
}

export default App;
