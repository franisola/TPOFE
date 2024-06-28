import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	pets: [],
	loading: false,
	error: false,
};

export const petSlice = createSlice({
	name: 'pets',
	initialState,
	reducers: {
		setPetsStart: (state) => {
			state.loading = true;
		},
		setPetsSuccess: (state, action) => {
			state.pets = action.payload;
			state.loading = false;
			state.error = false;
		},
		setPetsFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		addPetStart: (state) => {
			state.loading = true;
		},

		addPetSuccess: (state, action) => {
			state.pets.push(action.payload);
			state.loading = false;
			state.error = false;
		},
		addPetFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		removePetStart: (state) => {
			state.loading = true;
		},
		removePetSuccess: (state, action) => {
			state.pets = state.pets.filter((pet) => pet._id !== action.payload);
			state.loading = false;
			state.error = false;
		},
		removePetFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clear: (state) => {
			state.pets = [];
			state.loading = false;
			state.error = false;
		},
	},
});

export const {
	setPetsStart,
	setPetsSuccess,
	setPetsFailure,
	addPetStart,
	addPetSuccess,
	addPetFailure,
	removePetStart,
	removePetSuccess,
	removePetFailure,
	clear,
} = petSlice.actions;

export default petSlice.reducer;
