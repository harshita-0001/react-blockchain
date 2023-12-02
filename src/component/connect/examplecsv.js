import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExampleCsv() {
  const [open, setOpen] = React.useState(false);
  let array = [
    { _to: "0x0039294D31e5D4dc411712FE7C3678dAd832068D", _value: "0.000056" },
    { _to: "pavlik.eth", _value: "12" },
    { _to: "0xC8c30Fa803833dD1Fd6DBCDd91Ed0b301EFf87cF", _value: "13.45" },
    { _to: "0x7D52422D3A5fE9bC92D3aE8167097eE09F1b347d", _value: "1.049" },
    { _to: "0x64c9525A3c3a65Ea88b06f184F074C2499578A7E", _value: "1" },
  ];
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <span style={{ fontSize: "14px" }} onClick={handleClickOpen}>
        {" "}
        Show Sample CSV
      </span>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <div className="example-popup-wrap">
          <div className="row">
            <div className="example-popup">
              <div className="example-header d-flex justify-content-between align-items-center">
                <h3>Example CSV</h3>
                <button type="button" onClick={()=>handleClose()}>&#10005;</button>
              </div>
              <div
                className="view-container-wrap d-flex flex-column gap-3"
                style={{ padding: "0px 20px 20px"}}
              >
                <div className="view-container d-flex">
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
                    {
                      array.map((_,i)=> <span style={{ marginBottom: "10px" }} key={i+`span`}>{i+1}</span>)
                    }
                   
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
                    {
                       array.map((_,i)=><input
                       className="form-control"
                       style={{
                         backgroundColor: "transparent",
                         border: "none",
                       }}
                       value={`${array[i]._to},${array[i]._value}`}
                       key={`ex-${i}`}
                     ></input>)
                    }
                    
                  </div>
                </div>
                <div className="view-info">
                  <div className="view-media d-flex justify-content-between align-items-center gap-2" style={{padding:'10px'}}>
                    <img src="/info-icon.png" alt="" width={'20px'} height={'20px'} />
                    <p style={{ fontSize: "16px", margin: "0" }}>
                      You can try out the tool by using test tokens first. Visit{" "}
                      <u style={{ cursor: "pointer" }}>erc20faucet.com</u> to
                      mint those for free.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
      </Dialog>
    </div>
  );
}
