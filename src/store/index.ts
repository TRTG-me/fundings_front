import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import assetsSlice from "./slice/assets";
import watchListSlice from "./slice/watchlist";
import newsSlice from "./slice/news";
import fundingsSlice from "./fundings";


const store = configureStore({
    reducer: {
        auth: authSlice,
        assets: assetsSlice,
        watchlist: watchListSlice,
        news: newsSlice,
        fundings: fundingsSlice,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store