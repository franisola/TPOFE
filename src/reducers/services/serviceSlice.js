import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	refreshKey: 0,
	services: [],
	loading: false,
	error: false,
};

export const serviceSlice = createSlice({
	name: 'services',
	initialState,
	reducers: {
		setServicesStart: (state) => {
			state.loading = true;
		},
		setServicesSuccess: (state, action) => {
			state.services = action.payload;
			state.loading = false;
			state.error = false;
		},
		setServicesFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		
		clear: (state) => {
			state.services = [];
			state.loading = false;
			state.error = false;
		},
	},
});

export const {
	setServicesStart,
	setServicesSuccess,
	setServicesFailure,
	clear,
} = serviceSlice.actions;

export default serviceSlice.reducer;
