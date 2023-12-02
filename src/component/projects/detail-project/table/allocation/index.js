import { Fragment } from "react";
import ProjectDetailTable from "../project-detail/commom-table";

const AllocationTable=()=>{
    const header=[
        "No.",
        "Allocation",
        "Date",
        "Claimed",
        "Action"
    ];

    const addToken=async()=>{
    const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
    const tokenSymbol = 'TUT';
    const tokenDecimals = 18;
    const tokenImage = 'http://placekitten.com/200/300';
    
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });
    
      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
    }
        return(
           <div className="d-flex justify-content-between">
             <div className="col-lg-9">
             <ProjectDetailTable header={header}/>
             </div>
             <div className="col-lg-3">
             <button className="bg-warning rounded-5 p-2 mt-3 border" onClick={addToken}>Add Token to MetaMask</button>
             </div>
             
           </div>
        )
}

export default AllocationTable;