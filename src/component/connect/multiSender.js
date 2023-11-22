import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BigNumber, ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet, sample } from "../../feature/Connect/connectSlice";
import { ToastContainer, toast } from "react-toastify";
import Abijson from "./abi.json";
import SwitchButton from "./switchButton";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Papa from 'papaparse';
import ExampleCsv from "./examplecsv";
import ERC20Abi from './erc20.json';
const MultiSender = () => {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const [row, setRows] = useState([]);
  const [network, setNetwork] = useState("");
  const [panding, setPanding] = useState(null);
  const data = useSelector((data) => data.connect);
  const [tokenAddress, setTokenAddress] = useState(null);
  const [multiSenderAddress, setMultiSenderAddress] = useState("0x2Cb6f01295083DB39d213DD85d541D8691864725")
  const [signerAddress, setSigneAddress] = useState("");
  const [isToken, setToken] = useState(false)
  const[dataVal,setDataVal]=useState(["0x0000000000000000000000000000000000000000,0"]);
  // select token or other network
  const handleChange = async (event) => {
    if (event.target.value === "token") {
      setNetwork(event.target.value);
      setToken(true)
    }
    else {
      setToken(false)
 
      const chainId = Number(
        await window.ethereum.request({ method: "eth_chainId" })
      );
      const networkName = ethers.providers.getNetwork(chainId);
      if (networkName.name === event.target.value) {
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
      setSigneAddress(accountAddress)

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
        )
        const SplitData=await dataVal.map((a,i)=>{
          const p=a.split(",");
          row[i]={_to:"",_value:""};
          row[i]._to=p[0].trim();
          row[i]._value=p[1].trim();
          setRows(row);
        })
        const add = row.map((a) => a._to.trim());
        const val = row.map((a) => ethers.utils.parseUnits(a._value.toString(), 'ether'));
        let sum = BigNumber.from(0);
        val.forEach(amount => {
          sum = sum.add(amount)
        })
        const name = await ERC20Contract.name();
        const allowance = await ERC20Contract.allowance(signerAddress, multiSenderAddress);
        const allowanceInBigNum = BigNumber.from(allowance);

        if (allowanceInBigNum.gte(sum)) {
          toast.success('sufficent allowance')
        }
        else {
          try {
            const tx = await ERC20Contract.approve(multiSenderAddress, sum)
            const receipt = await tx.wait();
          } catch (error) {
              toast.error(error)
          }
        }

        const isUserVip = await contract.isVIP(signerAddress);

        try {
          let transferValue;
          if (isUserVip) {
            transferValue = 0;
          }
          else {
            transferValue = await contract.txFee();
          }

          const successTransaction = await contract.bulksendToken(
            tokenAddress,
            add,
            val,
            {
              value: transferValue
            }
          )
          setPanding(false)
          const h = await successTransaction.wait()
          if (h) {
            setPanding(true)
            setDataVal(["0x0000000000000000000000000000000000000000,0"])
          }
        } catch (error) {
          toast.error(error.code)
        }
      } catch (error) {
        toast.error("error", error);
      }
    }
    else {
      toast.error("Enter Token Address");
    }

  };

  // bulkSendCoinWithDifferentValue

  const sendMultipleCoin = async () => {
    const contract = new ethers.Contract(
      multiSenderAddress,
      Abijson,
      data?.signer
    )
    const SplitData=await dataVal.map((a,i)=>{
      const p=a.split(",");
      row[i]={_to:"",_value:""};
      row[i]._to=p[0].trim();
      row[i]._value=p[1].trim();
      setRows(row);
    })
    const add = row.map((a) => a._to.trim());
    const val = row.map((a) => ethers.utils.parseUnits(a._value.toString(), 'ether'));
    let sum = BigNumber.from(0);
    val.forEach(amount => {
      sum = sum.add(amount)
    })
    const isUserVip = await contract.isVIP(signerAddress);
    try {
      let transferValue;
      if (isUserVip) {

        transferValue = BigNumber.from(0);
      }
      else {
        transferValue = await contract.txFee();
      }
      let ans = await contract.bulkSendETHWithDifferentValue(
        add,
        val, {
        value: sum.add(transferValue)
      }
      )
      setPanding(false);
      const ethSuccess=await ans.wait();
      if(ethSuccess)
      {
      setPanding(true);
      setDataVal(["0x0000000000000000000000000000000000000000,0"])
      setNetwork("")
      }
    } catch (error) {
        toast.error(error.code)
    }
  }


  // useffect for Transaction is panding or not
  useEffect(() => {
    if (panding === false) {
      toast.warning("transction in pending")

    }
    if (panding === true) {
      toast.success("transction completed")
    }
  }, [panding])
  // add and delete address and value
  const adressField = (e, i) => {
    let newArr = [...dataVal];
    if (e.key === "Enter") {
      newArr.splice(i + 1, 0, " ")
      setDataVal(newArr)
      return;
    }
    if (e.key === "Delete") {
      newArr.splice(i, 1)
      setDataVal(newArr)

      return;
    }

  };
  // change value
  const changeVal=(e,i)=>{
    let val = e.target.value;
    const v=[...dataVal]
   v[i]=val;
   setDataVal(v)
    
  }

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
        const arr = [...row]
        result.data.map((val, i) => {
          arr.push({ _to: val[0], _value: val[1] })
        })
        setRows(arr)
      }
    })
  }

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
      const bigNumberToInteger = ethers.utils.formatEther(vipFee)

      if (data?.balance > bigNumberToInteger) {
        const success = await contract.registerVIP({
          value: vipFee
        }).then((success) => {
          if (success) {
            toast.success("Succesfully Added into VipList")
          }
        }).catch(error => toast.error(error.code));

      }
      else {
        toast.error("Dont'have Sufficet balance for pay VipFee")
      }

      return;
    }
    else {
      toast.info(`${signerAddress} already Vip user`)
    }


  }
  const changeTokenAddress = (e) => {
    setTokenAddress(e.target.value)
  }
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.paper',

          height: '100vh'
        }}
      >

        <Card
          sx={{
            width: "650px",
            m: 2,
            py: { xs: 5, md: 4 },
            px: { xs: 1 },
            borderRadius: 5,
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between"

          }} >
            <div>
              {
                panding === true && <Button variant="contained" color="success">Success</Button>

              }
              {
                panding === false && <LoadingButton
                  color="warning"
                  loading
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  variant="contained"
                >
                  pending
                </LoadingButton>
              }
              {
                !panding && panding !== false && <Button variant="contained" color="info" >Prepare</Button>
              }
            </div>
            <div>
              <Button variant="contained" color="info" onClick={() => vipUser()} disabled={login ? false : true}>Vip User</Button>
            </div>
          </div>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "90%" }}>
              <Box sx={{ display: "flex", flexDirection: "row", flexWrap: 'wrap' }}>
                <Box>
                  <Typography sx={{ textAlign: "start", marginLeft: "5%", my: "1%" }}>Select Token</Typography>

                  <InputLabel id="demo-simple-select-label" sx={{ marginTop: "30px" }}>Select Your Token</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={network}
                    label="Select Your Token"
                    style={{ padding: '10px' }}
                    onChange={handleChange}
                    sx={{ width: { xs: 250, sm: 450, md: 450 }, height: 42, borderRadius: 3, mt: 1 }}
                  >
                    <MenuItem value="token">Token</MenuItem>
                    <MenuItem value="maticmum">Mumbai</MenuItem>
                  </Select>

                </Box>
                <Box >
                  <Typography sx={{ textAlign: "start", my: "6%", mx: "10%" }}>Deflationary</Typography>
                  <SwitchButton />
                </Box>
              </Box>
            </FormControl>
            <div style={{ display: !isToken && "none" }}>
              <Typography sx={{ textAlign: "start", marginLeft: "6%", my: "1%" }}>Add Token Address</Typography>
              <TextField
                SelectProps={{ autoWidth: true }}
                sx={{
                  width: "85%",
                  "& .MuiInputBase-root": {
                    height: 45,
                  },
                  marginTop: "5px",
                  marginLeft: "-5%",
                  fieldset: { borderRadius: "10px" }
                }}
                type="text"
                name="token"
                style={{ borderColor: "transparent" }}
                placeholder="Enter Token Address"
                autoFocus
                value={tokenAddress || ""}
                onChange={(e) => changeTokenAddress(e)}
              />
            </div>
          </Box>
          <CardContent sx={{ width: "90%", mx: 1 }} >
            <div style={{ display: "flex", flexWrap: 'wrap' }}>
              <Typography sx={{ textAlign: "start", marginLeft: "2%", mb: 2 }} >List Of Address in CSV</Typography>
              <Typography sx={{ textAlign: "end", position: "relative", right: { xs: 0, sm: -40, md: -50 }, top: { xs: "49%", md: 10 }, bottom: { md: "-20px" }, width: { md: "60%", sm: "60%", xs: "100%" }, fontSize: "12px" }} ><ExampleCsv /></Typography>
            </div>
            <div style={{ border: "1px solid black ", padding: "10px", borderRadius: 5, height: "100px", overflowY: row?.length < 5 ? "hidden" : "scroll", overflowX: { md: "hidden", sm: "scroll", xs: "scroll" } }}>
              {dataVal?.map((_, i) => (
                <Box
                  sx={{ display: "flex", width: "100%" }}
                  key={`row-${i + 1}`}
                  id={`row-${i + 1}`}
                >
                  <div style={{ display: "flex" }}>
                    <b><span style={{ marginRight: "1px", paddingTop: "12px" }}>{i + 1}</span></b>
                    <TextField
                      SelectProps={{ autoWidth: true }}
                      sx={{
                        width: 440,
                        "& .MuiInputBase-root": {
                          height: 25,

                        },

                        fieldset: { borderColor: "transparent" }

                      }}
                      
                      type="text"
                      style={{ borderColor: "transparent" }}
                      onKeyUp={(e) => adressField(e, i)}
                      autoFocus
                      value={dataVal[i]}
                      // value={`${row[i]?._to|| ""} ${row[i]?._value || ""}`}
                      onChange={(e) => changeVal(e, i)}
                    />
                  </div>

                </Box>
              ))}


            </div>
            <div >

              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <input type="file" id="file-input" name="file" accept=".csv" style={{ display: "none" }} onChange={(e) => uploadFile(e)} />

                <InputLabel id="file-input-label" htmlFor="file-input"
                  style={{
                    fontSize: "1em",
                    padding: "3px 15px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    marginLeft: "79%"
                  }}
                >Upload CSV</InputLabel>
              </div>
            </div>
          </CardContent>
          {login ? (
            <Button variant="contained" onClick={isToken ? () => SendTransaction() : () => sendMultipleCoin()} sx={{ width: "90%", padding: 1.5, borderRadius: 3 }}>
              Send
            </Button>
          ) : (
            <Button variant="contained" onClick={() => connect()} sx={{ width: "90%" }}>
              Connect Wallet
            </Button>
          )}
          <ToastContainer
            position="top-right"
            closeOnClick
            autoClose={5000} />
        </Card>
      </Box>

    </div>
  )

};

export default MultiSender;
