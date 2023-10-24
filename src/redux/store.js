import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({ 
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
})