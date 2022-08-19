import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: { value: { email: '', uid: '' } },
};

export const CurrentUser = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser.value = action.payload;
    },
  },
});

export const { setCurrentUser } = CurrentUser.actions;

export default CurrentUser.reducer;
