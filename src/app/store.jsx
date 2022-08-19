import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './CurrentUser';

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
});
