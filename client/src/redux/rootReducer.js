import { combineReducers } from 'redux';

import resourceReducer from './slices/resourcesSlice';
import notificationReducer from './slices/notificationSlice';

const combinedReducer = combineReducers({
  resourceReducer,
  notificationReducer,
});

const rootReducer = (state, action) => {
  if (action?.type === 'auth/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
