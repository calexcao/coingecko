import { configureStore } from '@reduxjs/toolkit'
import { cryptoApi } from '../services/cryptoApi'
import favoritesReducer from '../redux/reducers/favoritesReducer'

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        favorites: favoritesReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(cryptoApi.middleware)
})