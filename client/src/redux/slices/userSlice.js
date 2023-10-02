import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfoKpiOkr: {},
  },
  reducers: {
    setUserInfoKpiOkr: (state, action) => {
      state.userInfoKpiOkr = action.payload.data;
    },
  },
});

export const { setUserInfoKpiOkr } = userSlice.actions;

export default userSlice.reducer;
