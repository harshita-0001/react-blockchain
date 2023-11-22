import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Box, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const Transition = React.forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExampleCsv() {
  const [open, setOpen] = React.useState(false);
let array=[
 { _to:"0x0039294D31e5D4dc411712FE7C3678dAd832068D",_value:"0.000056"},
{_to:"pavlik.eth",_value:"12"},
{_to:"0xC8c30Fa803833dD1Fd6DBCDd91Ed0b301EFf87cF",_value:"13.45"},
{_to:"0x7D52422D3A5fE9bC92D3aE8167097eE09F1b347d",_value:"1.049"},
{_to:"0x64c9525A3c3a65Ea88b06f184F074C2499578A7E",_value:"1"},
]
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button  onClick={handleClickOpen}>
       Show Sample Csv
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
       <div style={{display:"flex",justifyContent:"space-between"}}>
       <DialogTitle>{"Example CSV"}</DialogTitle>
        <CloseIcon style={{marginRight:"30px",marginTop:"20px"}} onClick={handleClose}></CloseIcon>
       </div>
        <DialogContent >
        <div style={{ border: "1px solid black ", padding: "10px", borderRadius: 10 }}>
              {array?.map((_, i) => (
                <Box
                  sx={{ display: "flex", width: "100%" }}
                  key={`row-${i + 1}`}
                  id={`row-${i + 1}`}
                >
                  <div >
                    <b><span style={{ marginRight: "1px", paddingTop: "12px" }}>{i + 1}</span></b>
                    <TextField
                      SelectProps={{ autoWidth: true }}
                      sx={{
                        width: { xs: 210, sm: 450, md: 450 },
                        "& .MuiInputBase-root": {
                          height: 25,

                        },

                        fieldset: { borderColor: "transparent" }

                      }}
                      type="text"
                      style={{ borderColor: "transparent" }}
                   
                      autoFocus
                      value={`${array[i]?._to || ""},${array[i]?._value || 0}`}
                   
                    />
                  </div>

                </Box>
              ))}


            </div>
        </DialogContent>
       
      </Dialog>
    </div>
  );
}
