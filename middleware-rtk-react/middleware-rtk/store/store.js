import { configureStore } from "@reduxjs/toolkit";
import apiReducer from '../features/apiSlice'
import middlewareApiRequest from "../middleware/middleware";

const store= configureStore({
    reducer: {
        api: apiReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewareApiRequest)
});

export default store;