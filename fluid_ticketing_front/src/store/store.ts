import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/reducers/authSlice';
import companyReducer from '../store/reducers/companySlice';
import projectReducer from '../store/reducers/projectSlice';
import ticketsReducer from '../store/reducers/ticketSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        company: companyReducer,
        project: projectReducer,
        tickets: ticketsReducer
    },
});