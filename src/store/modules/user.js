import { createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo:{},
    token: null,
  },
  reducers: {
    setUserInfoState:(state,action) => {
      state,userInfo = Object.assign(state.userInfo, action.payload)
    },
    setUserToken: (state,action)=> {
      state.token = action.payload;
    },
    clearUserToken: (state)=> {
      state.token = null;
    }
  }
})

export const { setUserInfoState, setUserToken,clearUserToken} = userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserToken = (state) =>state.user.token;

export default userSlice.reducer;