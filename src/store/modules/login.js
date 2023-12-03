import {createSlice} from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name:'login',
  initialState: {
    isLogin: false,
  },
  reducers: {
    LoginIn: state=>{
      state.isLogin = true
    },
    LoginOut: state=>{
      state.isLogin = false
    }
  }
})

export const { LoginIn,LoginOut } = loginSlice.actions;
export const selectLogin = (state)=>state.login.isLogin
export default loginSlice.reducer;