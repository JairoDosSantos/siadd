import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./authSlice";
import pedidoSlice from "./pedidosSlices";


const combineReducer = combineReducers({
    authSlice,
    pedidoSlice
})

export const store = () =>
    configureStore({
        reducer: {
            combineReducer
        },
        devTools: true,
    });

/**
 *
    // Infer the `RootState` and `AppDispatch` types from the store itself
    export type RootState = ReturnType<typeof store.getState>
    // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
    export type AppDispatch = typeof store.dispatch
 */

type ConfiguredStore = ReturnType<typeof store>;
type StoreGetState = ConfiguredStore["getState"];
export type RootState = ReturnType<StoreGetState>;
export type AppDispatch = ConfiguredStore["dispatch"];

export const wrapper = createWrapper(store);