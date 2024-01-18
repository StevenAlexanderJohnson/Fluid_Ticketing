import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/reducers/authSlice';
import companyReducer from '../store/reducers/companySlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        company: companyReducer,
    },
});