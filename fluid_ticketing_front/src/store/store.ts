import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/reducers/authSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
    },
});