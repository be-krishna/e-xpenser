import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import tasksReducer from './features/tasksSlice';
import taskReducer from './features/taskSlice';
import txnsReducer from "./features/txnsSlice"
import txnReducer from "./features/txnSlice"

const makeStore = () => configureStore({
    reducer: {
        tasks: tasksReducer,
        task: taskReducer,
        txns: txnsReducer, 
        txn: txnReducer, 
    },
    devtools: true
})


export const wrapper = createWrapper(makeStore)
