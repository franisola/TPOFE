import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	refreshKey: 0,
	contracts: [],
	loading: false,
	error: false,
};

export const contractSlice = createSlice({
	name: 'contracts',
	initialState,
	reducers: {
		setContractsStart: (state) => {
			state.loading = true;
		},
		setContractsSuccess: (state, action) => {
			state.contracts = action.payload;
			state.loading = false;
			state.error = false;
		},
		setContractsFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clear: (state) => {
			state.contracts = [];
			state.loading = false;
			state.error = false;
		},
	},
});

export const { setContractsStart, setContractsSuccess, setContractsFailure, clear } =
	contractSlice.actions;

export default contractSlice.reducer;
