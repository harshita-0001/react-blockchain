import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import { BigNumber, ethers } from "ethers";
import {  useDispatch, useSelector } from "react-redux";
import { connectWallet, sample } from "../../feature/Connect/connectSlice";
import { ToastContainer, toast } from "react-toastify";
import Abijson from "./abi.json";
import Papa from "papaparse";
import ExampleCsv from "./examplecsv";
import ERC20Abi from "./erc20.json";

//new css
import "./multiSender.css";


const MultiSender = () => {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const [row, setRows] = useState([]);
  const [network, setNetwork] = useState("");
  const [panding, setPanding] = useState(null);
  const data = useSelector((data) => data.connect);
  const [tokenAddress, setTokenAddress] = useState(null);
  const [multiSenderAddress, setMultiSenderAddress] = useState(
    "0x2Cb6f01295083DB39d213DD85d541D8691864725"
  );
  const [signerAddress, setSigneAddress] = useState("");
  const [isToken, setToken] = useState(false);
  const [dataVal, setDataVal] = useState([
    "0x0000000000000000000000000000000000000000,0",
  ]);
  const inputRefs = dataVal.map(() => React.createRef());
  
 
  // select token or other network
  async function getNetworkData(){
    const chainId = Number(
      await window.ethereum.request({ method: "eth_chainId" })
    );
    const networkName =  ethers.providers.getNetwork(chainId);
    return networkName
  }
  const handleChange = async (event) => {
    const eventValue=event.target.value

    if (eventValue==='token') {
      setNetwork(eventValue);
      setToken(true);
    }else{
      setToken(false);
      const networkName= await getNetworkData();
      if (networkName.name === eventValue) {
        setNetwork(networkName.name);
      } else {
        toast.error("This Network are not connected");
      }
    }
  };

  //conection
 const connect = async () => {
    if (typeof window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
      const balance = await provider?.getBalance(accountAddress);
      const balanceInEth = ethers.utils.formatEther(balance);
      setSigneAddress(accountAddress);
  
      dispatch(
        connectWallet({
          provider: provider,
          accountAddress: accountAddress,
          signer: signer,
          amount: balanceInEth,
        })
      );
      setLogin(true);
    } else {
      console.log("install MetaMask");
    }
  };

  // Send Multiple Tokens
  const SendTransaction = async () => {
    connect();

    if (tokenAddress) {
      try {
        const contract = new ethers.Contract(
          multiSenderAddress,
          Abijson,
          data?.signer
        );

        const ERC20Contract = new ethers.Contract(
          tokenAddress,
          ERC20Abi,
          data?.signer
        );
        const SplitData = await dataVal.map((a, i) => {
          const p = a.split(",");
          row[i] = { _to: "", _value: "" };
          row[i]._to = p[0].trim();
          row[i]._value = p[1].trim();
          setRows(row);
        });
        const add = row.map((a) => a._to.trim());
        const val = row.map((a) =>
          ethers.utils.parseUnits(a._value.toString(), "ether")
        );
        let sum = BigNumber.from(0);
        val.forEach((amount) => {
          sum = sum.add(amount);
        });
        const name = await ERC20Contract.name();
        const allowance = await ERC20Contract.allowance(
          signerAddress,
          multiSenderAddress
        );
        const allowanceInBigNum = BigNumber.from(allowance);

        if (allowanceInBigNum.gte(sum)) {
          toast.success("sufficent allowance");
        } else {
          try {
            const tx = await ERC20Contract.approve(multiSenderAddress, sum);
            const receipt = await tx.wait();
          } catch (error) {
            toast.error(error);
          }
        }

        const isUserVip = await contract.isVIP(signerAddress);

        try {
          let transferValue;
          if (isUserVip) {
            transferValue = 0;
          } else {
            transferValue = await contract.txFee();
          }

          const successTransaction = await contract.bulksendToken(
            tokenAddress,
            add,
            val,
            {
              value: transferValue,
            }
          );
          setPanding(false);
          const h = await successTransaction.wait();
          if (h) {
            setPanding(true);
            setDataVal(["0x0000000000000000000000000000000000000000,0"]);
          }
        } catch (error) {
          toast.error(error.code);
        }
      } catch (error) {
        toast.error("error", error);
      }
    } else {
      toast.error("Enter Token Address");
    }
  };

  // bulkSendCoinWithDifferentValue

  const sendMultipleCoin = async () => {
    const contract = new ethers.Contract(
      multiSenderAddress,
      Abijson,
      data?.signer
    );
    const SplitData = await dataVal.map((a, i) => {
      const p = a.split(",");
      row[i] = { _to: "", _value: "" };
      row[i]._to = p[0].trim();
      row[i]._value = p[1].trim();
      setRows(row);
    });
    const add = row.map((a) => a._to.trim());
    const val = row.map((a) =>
      ethers.utils.parseUnits(a._value.toString(), "ether")
    );
    let sum = BigNumber.from(0);
    val.forEach((amount) => {
      sum = sum.add(amount);
    });
    const isUserVip = await contract.isVIP(signerAddress);
    try {
      let transferValue;
      if (isUserVip) {
        transferValue = BigNumber.from(0);
      } else {
        transferValue = await contract.txFee();
      }
      let ans = await contract.bulkSendETHWithDifferentValue(add, val, {
        value: sum.add(transferValue),
      });
      setPanding(false);
      const ethSuccess = await ans.wait();
      if (ethSuccess) {
        setPanding(true);
        setDataVal(["0x0000000000000000000000000000000000000000,0"]);
        setNetwork("");
      }
    } catch (error) {
      toast.error(error.code);
    }
  };

  // useffect for Transaction is panding or not
  useEffect(() => {
    if (panding === false) {
      toast.warning("transction in pending");
    }
    if (panding === true) {
      toast.success("transction completed");
      setTimeout(()=>{
          setPanding("")
      },2000)
    }
  }, [panding]);
  // add and delete address and value
  const adressField = (e, i) => {
    let newArr = [...dataVal];
    if (e.key === "Enter") {
      newArr.splice(i + 1, 0, " ");
      setDataVal(newArr);
      return;
    }
    if (e.key === "Delete") {

      if(newArr?.length==1) return
     
      if (i > 0) {
        inputRefs[i - 1].current.focus();
      }
      newArr.splice(i, 1);
      setDataVal(newArr);

      return;
    }
  };
  // change value
  const changeVal = (e, i) => {
    let val = e.target.value;
    const v = [...dataVal];
    v[i] = val;
    setDataVal(v);
  };

  // for check User is Connected or Not
  async function isConnected() {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setLogin(true);
      connect();
    } else {
      toast.warning("Metamask is not connected");
    }
  }
  useEffect(() => {
    isConnected();
  }, [login]);

  //upload csv file
  const uploadFile = (e) => {
    Papa.parse(e.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: function (result) {
        const arr = [...dataVal];
        result.data.map((val, i) => {
          arr.push(val.toString());
        });
        setDataVal(arr);
      },
    });
  };
  //Make user Vip
  const vipUser = async () => {
    const contract = new ethers.Contract(
      multiSenderAddress,
      Abijson,
      data?.signer
    );

    const isVip = await contract.isVIP(signerAddress);
    if (!isVip) {
      const vipFee = await contract.VIPFee();
      const bigNumberToInteger = ethers.utils.formatEther(vipFee);

      if (data?.balance > bigNumberToInteger) {
        const success = await contract
          .registerVIP({
            value: vipFee,
          })
          .then((success) => {
            if (success) {
              toast.success("Succesfully Added into VipList");
            }
          })
          .catch((error) => toast.error(error.code));
      } else {
        toast.error("Dont'have Sufficet balance for pay VipFee");
      }

      return;
    } else {
      toast.info(`${signerAddress} already Vip user`);
    }
  };
  const changeTokenAddress = (e) => {
    setTokenAddress(e.target.value);
  };
  return (
    <div style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexFlow: "column",
          gap: "1.8em",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.paper",
          backgroundColor: "#0b114c",
          backgroundImage:
            "radial-gradient(circle at left 60%,rgba(20,44,255,.4),rgba(20,44,255,0),rgba(20,44,255,0),rgba(20,44,255,0)),radial-gradient(circle at right 60%,rgba(20,44,255,.4),rgba(20,44,255,0),rgba(20,44,255,0),rgba(20,44,255,0));",
          backgroundAttachment: "fixed",
          height: "100vh",
        }}
      >
         <div className="status-header">
          <div className="status-header-wrap d-flex justify-content-between align-items-center w-100">
            <div className="step">
              <span className={`step-marker ${!panding && panding !== false &&'active'}`}>
                <span>1</span>
              </span>
              <span className={`step-label ${!panding && panding !== false &&'active'}`}>Prepare</span>
            </div>
            <div className="step">
              <span className={`step-marker ${panding===false && 'active'}`}>
                <span>2</span>
              </span>
              <span className={`step-label ${panding===false && 'active'}`}>Approve</span>
            </div>
            <div className="step">
              <span className={`step-marker ${panding===true && 'active'}`}>
                <span>3</span>
              </span>
              <span className={`step-label ${panding===true && 'active'}`}>Multisend</span>
            </div>
          </div>
        </div>
        <Card
          sx={{
            width: "650px",
            padding: "1.71em",
            borderRadius: 5,
            border: "1px solid #415d9f",
            background: "transparent",
          }}
        >
       

          <div className="form-header">
         
            <div className="d-flex justify-content-end mb-3">
              <button
                type="button"
                className="px-2 py-1"
                style={{
                  backgroundColor: "#00a6ff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
                onClick={vipUser}
              >
                VIP User
              </button>
            </div>
            <div className="d-flex justify-content-between align-items-center text-start">
              <div className="flex-grow-1 me-1">
                <label className="form-label">Token Address</label>
                <select
                  className="form-select"
                  id="inputGroupSelect04"
                  aria-label="Example select with button addon"
                  value={network}
                  onChange={handleChange}
                >
                  <option value="">Select Token</option>
                  <option value="token">Token</option>
                  <option value="maticmum">Mumbai</option>
                </select>
              </div>
              <div className="flex-shrink-0 ms-1">
                <label className="form-label mb-1" style={{ fontSize: "14px" }}>
                  Deflationary <img src="/i-icon.png" alt="" />{" "}
                </label>
                <div style={{marginTop:'1px'}}>
                  <label className="switch">
                    <input type="checkbox"></input>
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="" style={{ display: !isToken && "none" }}>
              <Typography style={{fontSize:'12px'}}
                sx={{ textAlign: "start", my: "2%" ,color:'white'}}
              >
                Add Token Address
              </Typography>
              
              <input type="text" className="form-control" style={{backgroundColor:'transparent', border:'1px solid #415d9f '}}  value={tokenAddress || ""}
                onChange={(e) => changeTokenAddress(e)}/>         

            

            </div>

            <div className="my-4">
              <div className="label-container d-flex justify-content-between mb-2">
                <div className="label">List of Addresses in CSV</div>
                <button type="button" className="show-example">
                  <ExampleCsv />
                </button>
              </div>
              <div className="main-container">
                <div className="view-container-wrap d-flex">
                  <div
                    className="px-3 pt-2 d-flex flex-column"
                    style={{
                      border: "1px solid #415d9f",
                      borderRight: "none",
                      color: "##9ed8ff",
                      background: "#16205C",
                      borderTopLeftRadius: "5px",
                      borderBottomLeftRadius: "5px",
                    }}
                  >
                    {dataVal?.map((_, i) => (
                      <span style={{ marginBottom: "10px", color: "#fff" }} key={`span-${i}`}>
                        {i + 1}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      minHeight: "7em",
                      background: "transparent",
                      border: "1px solid #415d9f",
                      borderTopRightRadius: "5px",
                    }}
                  >
                    {dataVal?.map((_, i) => (
                      <input
                        className="form-control"
                        style={{
                          backgroundColor: "transparent",
                          color: "#fff",
                          border: "none",
                        }}
                        onKeyUp={(e) => adressField(e, i)}
                        value={dataVal[i]}
                        autoFocus
                        ref={inputRefs[i]}
                        onChange={(e) => changeVal(e, i)}
                        key={i-'input'}
                      ></input>
                    ))}
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <input
                      type="file"
                      id="file-input"
                      name="file"
                      accept=".csv"
                      style={{ display: "none" }}
                      onChange={(e) => uploadFile(e)}
                    />
                
                    <InputLabel
                      id="file-input-label"
                      htmlFor="file-input"
                      className="upload-btn"
                    >
                      Upload CSV
                    </InputLabel>
                   
                  </div>
               
                </div>
              </div>
            </div>
          </div>

      
             {login ? (
            <button
              type="button"
              className="send-btn py-2"
              onClick={
                isToken ? () => SendTransaction() : () => sendMultipleCoin()
              }
            >
              SEND
            </button>
          ) : (
            <button
              type="button"
              className="send-btn py-2"
              onClick={() => connect()}
            >
              CONNECT WALLET
            </button>
          )}
         
          <ToastContainer position="top-right" closeOnClick autoClose={5000} />
        </Card>
      </Box>
    </div>
  );
};

export default MultiSender;