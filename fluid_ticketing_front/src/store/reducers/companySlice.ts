import { createSlice } from "@reduxjs/toolkit";
import { Company } from "../../../../server/src/Models/Company";

export const companySlice = createSlice({
    name: 'company',
    initialState: {
        companyData: null,
    } as { companyData: Company | null },
    reducers: {
        setCompany: (state, action) => {
            console.log('setCompany action', action.payload)
            state.companyData = action.payload;
        },
        clearCompany: (state) => {
            console.log('clearCompany action')
            state.companyData = null;
        }
    }
});

export const { setCompany, clearCompany } = companySlice.actions;

export default companySlice.reducer;