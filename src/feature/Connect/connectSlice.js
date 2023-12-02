import { createSlice } from "@reduxjs/toolkit";
const initialState={
    address:"",
    provider:"",
    signer:"",
    balance:"",
}
export const connectSlice=createSlice({
    name:'connect',
    initialState,
    reducers:{
        connectWallet:(state,{payload})=>{
           state.provider =payload.provider;
           state.address = payload.accountAddress;
           state.signer = payload.signer;
           state.balance=payload.amount
        }
    }
})
export const {connectWallet,sample}=connectSlice.actions;
export default connectSlice.reducer;