/*
 * @Description: 
 * @Version: 
 * @Autor: Austral
 * @Date: 2023-07-31 09:33:09
 * @LastEditors: Austral
 * @LastEditTime: 2023-10-20 12:46:11
 */
// configureStore.js
import {
  configureStore,
  createSlice,
  getDefaultMiddleware
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  combineReducers,
  Reducer
} from 'redux';
import userReducer from './modules/user';
import loginReducer from './modules/login'
import {
  loginSlice
} from './modules/login';

const rootReducer = combineReducers({
  user: userReducer,
  login: loginReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
  blacklist: ['device'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});

export const persistor = persistStore(store);