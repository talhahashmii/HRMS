import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import mainSlice from './main-slice';
import userSlice from './user-slice';

const store = configureStore({
    reducer:{
        authSlice,
        mainSlice,
        userSlice,
    }
})


export default store;