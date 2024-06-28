import { createSlice } from '@reduxjs/toolkit';
import { verifyData } from '../../api/usersApi';


const initialState = {
	currentUser: null,
	loading: false,
	error: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		signInStart: (state) => {
			state.loading = true;
		},
		signInSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = false;
		},
		signInFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state) => {
			state.currentUser = null;
			state.loading = false;
			state.error = false;
		},
        verifyDataStart: (state) => {
            state.loading = true;
        },
		verifyDataSuccess: (state) => {
			state.loading = false;
			state.error = false;
		},
		verifyDataFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		changePasswordStart: (state) => {
			state.loading = true;
		},
		changePasswordSuccess: (state) => {
			state.loading = false;
			state.error = false;
		},
		changePasswordFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
        editUserStart: (state) => {
            state.loading = true;
        },
        editUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        editUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
	},
});

// Action creators are generated for each case reducer function
export const {
	signInStart,
	signInSuccess,
	signInFailure,
	logout,
    verifyDataStart,
	verifyDataFailure,
	verifyDataSuccess,
	changePasswordStart,
	changePasswordSuccess,
	changePasswordFailure,
    editUserStart,
    editUserSuccess,
    editUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
