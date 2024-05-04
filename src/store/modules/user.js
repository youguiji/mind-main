import { createSlice} from '@reduxjs/toolkit';
import { actions } from 'react-native-pell-rich-editor';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo:{},
    token: null,
    isVisite: 0,
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
    },
    setIsVisite: (state,actions) =>{
      state.isVisite = actions.payload;
    },
    clearIsVisite: (state,actions) => {
      state.isVisite = 0;
    }
  }
})

export const { setUserInfoState, setUserToken,clearUserToken,setIsVisite,clearIsVisite} = userSlice.actions;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserToken = (state) =>state.user.token;
export const selectIsVisite = (state) => state.user.isVisite;

export default userSlice.reducer;