import { configureStore } from '@reduxjs/toolkit'


import homeSlice from './homeSlice'

console.log(homeSlice);
export const store = configureStore({
  reducer: {
    home:homeSlice,
  },
})