import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Navbar = () => {
  const [isLogin,setIsLogin]=useState(false)
  const connect = async () => {
    if (typeof window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const data=await provider.send("eth_requestAccounts", []);
      if(data)
      {
        setIsLogin(true);

      }
    } else {
      console.log("install MetaMask");
    }
  };

  async function isConnected() {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setIsLogin(true);
      await connect();
    } else {
      toast.warning("Metamask is not connected");
    }
  }
  useEffect(() => {
    isConnected();
  }, [isLogin]);
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mx-4">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <NavLink className="navbar-brand" to="/" >
         Home
        </NavLink>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <a className="nav-link" href="#" onClick={connect}>
             Connect Wallet
            </a>
            
          </li>
          <li className="nav-item">
           <NavLink to="/projects" className="nav-link">Projects</NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              theme
            </a>
          </li>
        </ul>
     
      </div>
      <ToastContainer position="top-right" closeOnClick autoClose={5000} />
    </nav>
  );
};

export default Navbar;
