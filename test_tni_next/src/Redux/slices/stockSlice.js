"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const UrlAPI = "https://localhost:7120/api";
//https://localhost:7120/api/stockCartController1/GetStock

export const getStock = createAsyncThunk("", async () => {
  try {
    var config = {
      method: "get",
      url: UrlAPI + `/stockCartController1/GetStock`,
      headers: {
        accept: "application/json",
      },
    };
    const response = await axios(config);
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const stockSlice = createSlice({
  name: "stock",
  initialState: {
    stocks: [],
  },
  reducers: {
    // getStock: (state) => {
    //   state.stocks = Service.getStock();
    // },
  },
  extraReducers: {
    [getStock.fulfilled]: (state, { payload }) => {
      console.log("payload");
      console.log(payload);
      state.stocks = payload;
    },
  },
});

//export const { getStock } = stockSlice.actions
export default stockSlice.reducer;