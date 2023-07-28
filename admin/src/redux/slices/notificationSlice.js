import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: [],
        countNumber: 0,
    },
    reducers: {
        setNotifications: (state, action) => {
            state.notifications = action.payload.data;
        },
        setCountNumber: (state, action) => {
            state.countNumber = action.payload.data;
        },
    },
});

export const { setNotifications, setCountNumber } = notificationSlice.actions;

export default notificationSlice.reducer;
