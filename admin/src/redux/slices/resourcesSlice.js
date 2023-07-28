import { createSlice } from '@reduxjs/toolkit';

export const resourceSlice = createSlice({
  name: 'resources',
  initialState: {
    services: null,
    provinces: null,
    categories: null,
    postRate: null,
    pointRate: null,
    massageRate: null,
    teleLink: null,
    privacy: '',
    contentFooter:'',
  },
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload.data;
    },
    setProvinces: (state, action) => {
      state.provinces = action.payload.data;
    },
    setCategories: (state, action) => {
      state.categories = action.payload.data;
    },
    setPostRate: (state, action) => {
      state.postRate = action.payload.data;
    },
    setPointRate: (state, action) => {
      state.pointRate = action.payload.data;
    },
    setMassageRate: (state, action) => {
      state.massageRate = action.payload.data;
    },
    setTeleLink: (state, action) => {
      state.teleLink = action.payload.data;
    },
    setPrivacy: (state, action) => {
      state.privacy = action.payload.data;
    },
    setContentFooter: (state, action) => {
      state.contentFooter = action.payload.data;
    },
  },
});

export const {
  setServices,
  setProvinces,
  setCategories,
  setPostRate,
  setPointRate,
  setMassageRate,
  setTeleLink,
  setPrivacy,
  setContentFooter
} = resourceSlice.actions;

export default resourceSlice.reducer;
