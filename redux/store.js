import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import txnsReducer from "./features/txnsSlice"
import txnReducer from "./features/txnSlice"

const makeStore = () => configureStore({
  reducer: {
    txns: txnsReducer, 
    txn: txnReducer, 
  },
  devtools: true
})


export const wrapper = createWrapper(makeStore)
