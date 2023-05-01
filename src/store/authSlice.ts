import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
    authState: boolean;
}

// Initial state
const initialState: AuthState = {
    authState: false,
};

// Actual Slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        // Action to set the authentication status
        setAuthState(state, action) {
            state.authState = action.payload;
        },

    },
    // Special reducer for hydrating the state. Special case for next-redux-wrapper

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            };
        },
    }

});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.combineReducer.authSlice;

export default authSlice.reducer;