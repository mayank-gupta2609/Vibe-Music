import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import artistReducer from './features/artistSlice';
import albumReducer from './features/albumSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        artist: artistReducer,
        album: albumReducer
    }
})