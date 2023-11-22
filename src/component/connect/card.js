import { React, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { connectWallet } from "../../feature/Connect/connectSlice";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NonceManager } from "@ethersproject/experimental";
export default function Connect() {
  const dispatch = useDispatch();
  //array of objects
  const [detail, setDetail] = useState([{ receiver: "", amount: 0 }]);
  //check account is connected or not connected
  const [login, setLogin] = useState(false);
  //get data from connect redux store
  const data = useSelector((data) => data.connect);
  //connect wallet
  const connect = async () => {
    if (typeof window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const accountAddress = await signer.getAddress();
      const balance = await provider.getBalance(accountAddress);
      const balanceInEth = ethers.utils.formatEther(balance);

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

  if (detail?.length == 0) {
    setDetail([{ receiver: "", amount: 0 }]);
  }

  //send token connected account to other account
  
  const SendTransaction = async () => {
    try {
      detail?.map(async (val, i) => {
        if (val.receiver && val.amount) {
          if (val.amount > data?.balance) {
            toast.error(
              `Your wallet  have only ${data?.balance} so that transction ${
                i + 1
              } is canceled`
            );
          } else {
            await data?.signer
              ?.sendTransaction({
                to: val.receiver,
                value: ethers.utils.parseUnits(val.amount, 18),
              })
              .then((data) => {
                try {
                  const d = [...detail];
                  d[i].receiver = "";
                  d[i].amount = 0;
                  detail.map((val) => {
                    if (!val.receiver && !val.amount) {
                      d.splice(i, 1);
                      setDetail(d);
                    }
                  });
                  toast.success(`transction ${i + 1} completed`);
                } catch (error) {
                  console.log("ffff",error);
                }
              })
              .catch((error) => console.log(error.message));
          }
        } else {
          // toast.warning(`Please Enter detail for ${i+1} transcation`)
          const d = [...detail];
          d.splice(i, 1);
          setDetail(d);
        }
      });
    } catch (error) {
      toast.error(error.message);
    }
    // setDetail([{receiver:"", amount:0}]);
  };

  //Check condition account is connected or not connected
  async function isConnected() {
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) {
      setLogin(true);
      connect();
    } else {
      toast.warning("Metamask is not connected");
    }
  }
  //add new Transation account to list
  const addInputField = (e) => {
    setDetail([...detail, { receiver: "", amount: 0 }]);
  };
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const data = [...detail];
    data[i][name] = value;
    setDetail(data);
  };
  useEffect(() => {
    isConnected();
  }, [login]);
  return (
    <Card
      sx={{
        maxWidth: 345,
        marginLeft: "40%",
        marginTop: "15%",
        padding: "10px",
      }}
    >
      <Typography variant="h4">Send Amount</Typography>
      <Button
        variant="contained"
        sx={{ margin: "5px" }}
        onClick={() => addInputField()}
      >
        Add Account
      </Button>
      {Array.isArray(detail) &&
        detail.length != 0 &&
        detail.map((val, index) => (
          <div key={index}>
            <Typography variant="h6">Transcation detail</Typography>
            <TextField
              id="outlined-basic"
              label="Receiver Address"
              variant="outlined"
              name="receiver"
              value={val.receiver}
              onChange={(e) => handleChange(e, index)}
            />
            <TextField
              id="outlined-basic"
              label="Amount"
              variant="outlined"
              name="amount"
              sx={{ margin: "10px" }}
              value={val.amount}
              onChange={(e) => handleChange(e, index)}
            />
            <br />
          </div>
        ))}
      {login ? (
        <Button variant="contained" onClick={() => SendTransaction()}>
          Send
        </Button>
      ) : (
        <Button variant="contained" onClick={() => connect()}>
          Connect Wallet
        </Button>
      )}
      <ToastContainer position="top-right" />
    </Card>
  );
}
