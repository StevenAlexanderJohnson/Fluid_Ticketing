import { createSlice } from "@reduxjs/toolkit";

interface AuthSliceInterface {
    user: any;
    token: string | null;
    refreshToken: string | null;
    isLoggedIn: boolean;
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: sessionStorage.getItem('user') ? sessionStorage.getItem('user')! : null,
        token: sessionStorage.getItem('token') ? sessionStorage.getItem('token')! : null,
        refreshToken: sessionStorage.getItem('refreshToken') ? sessionStorage.getItem('refreshToken')! : null,
        isLoggedIn: sessionStorage.getItem('token') ? true : false,
    } as AuthSliceInterface,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isLoggedIn = true;
            sessionStorage.setItem('user', action.payload.user);
            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isLoggedIn = false;
        }
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;