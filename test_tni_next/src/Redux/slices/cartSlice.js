import { createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { getStock } from "@/Redux/slices/stockSlice";
import { redirect } from 'next/navigation'
import axios from "axios";
//stockSlice
const UrlAPI = "https://localhost:7120/api";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
  },
  reducers: {
    addToCart: (state, action) => {
      console.log(action);
      console.log(state.carts);
      const itemExists = state.carts.find((item) => item.id === action.payload.id);
      if (itemExists) {
        if (itemExists.amount < action.payload.amount) {
          itemExists.amount++;
        } else {
          alert("สินค้าไม่เพียงพอ");
        }
      } else {
        state.carts.push({ ...action.payload, amount: 1 });
      }
    },
    increAmount: (state, action) => {
      // const item = state.find((item) => item.id === action.payload);
      // const reduxStore = stockSlice.reducer;
      // console.log(reduxStore);
      // //const itemstock = reduxStore.find((item) => item.id === action.payload);
      // if(itemstock >= item){
      //   item.amount++;
      // }else{
      //   alert("จำนวนสินค้าไม่เพียงพอ");
      // }
      const item = state.carts.find((item) => item.id === action.payload);
      item.amount++;
    },
    decreAmount: (state, action) => {
      console.log(state);
      const item = state.carts.find((item) => item.id === action.payload);
      if (item.amount === 1) {
        const index = state.carts.findIndex((item) => item.id === action.payload);
        state.carts.splice(index, 1);
      } else {
        item.amount--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.carts.findIndex((item) => item.id === action.payload);
      state.carts.splice(index, 1);
    },
    
    clearCart: (state) => {
      state.carts = []
    },
 
    
  },
});

//export const cartReducer = cartSlice.reducer;
export default cartSlice.reducer;
export const {
  addToCart,
  increAmount,
  decreAmount,
  removeFromCart,
  clearCart,
} = cartSlice.actions;
