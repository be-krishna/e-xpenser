import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";


const baseUri = "http://localhost:3000";


// Read Transactions
export const readTxns = createAsyncThunk("txns/readTxns", async () => {
  try {
    const response = await axios.get(`${baseUri}/api/transactions`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
});


const txnsSlice = createSlice({
  name: "txns",
  initialState: {
    txns: [],
    loading: null,
    success: null,
    message: null
  },
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, { payload }) => {
      return {
        ...state,
        ...payload.txns,
      };
    },
    [readTxns.pending]: (state) => {
      state.loading = true;
    },
    [readTxns.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.txns = payload.txns;
      state.success = true;
    },
    [readTxns.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
  },
});

export default txnsSlice.reducer;
