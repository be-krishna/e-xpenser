import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import axios from "axios";


const baseUri = "http://localhost:3000";


// Create Transaction
export const createTxn = createAsyncThunk("txn/createTxn", async (data) => {
  try {
    const response = await axios.post(`${baseUri}/api/transactions`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
});

// Read Transaction
export const readTxn = createAsyncThunk(
  "txn/readTxn",
  async ({ id, req }) => {
    try {
      const response = await axios.get(`${baseUri}/api/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

// Update Transaction
export const updateTxn = createAsyncThunk(
  "txn/updateTxn",
  async ({ id, data }) => {
    try {
      const response = await axios.put(`${baseUri}/api/transactions/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  }
);

// Delete Transactions
export const deleteTxn = createAsyncThunk("txn/deleteTxn", async (id) => {
  try {
    const response = await axios.delete(`${baseUri}/api/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
});


const txnSlice = createSlice({
  name: "txn",
  initialState: {
    txn: {},
    loading: null,
    success: null,
    message: null
  },
  reducers: {},
  extraReducers: {
    [HYDRATE]: (state, { payload }) => {
      return {
        ...state,
        ...payload.txn,
      };
    },
    [createTxn.pending]: (state) => {
      state.loading = true;
    },
    [createTxn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.txn = payload.txn;
      state.success = true;
    },
    [createTxn.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
    [readTxn.pending]: (state) => {
      state.loading = true;
    },
    [readTxn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.txn = payload.txn;
      state.success = true;
    },
    [readTxn.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
    [updateTxn.pending]: (state) => {
      state.loading = true;
    },
    [updateTxn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.txn = payload.txn;
      state.success = true;
    },
    [updateTxn.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    },
    [deleteTxn.pending]: (state) => {
      state.loading = true;
    },
    [deleteTxn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = payload;
    },
    [deleteTxn.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = payload;
    }
  },
});

export default txnSlice.reducer;
