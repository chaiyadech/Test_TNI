"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import cartReducer from "./slices/cartSlice"
import stockReducer from "./slices/stockSlice";

const reducers = ({
    cart: cartReducer,
    stock: stockReducer
})

//Global store
export const store = configureStore({
  reducer:reducers
});


export const useAppDispatch = () => useDispatch();