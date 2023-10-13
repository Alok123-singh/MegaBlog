import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';
import searchSlice from './searchSlice';

const store = configureStore({
    reducer : {
        auth: authSlice,
        search: searchSlice
        // add more slices for posts
    }
});

export default store;