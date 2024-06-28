import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    refreshKey: 0,
	comments: [],
	loading: false,
	error: false,
};

export const CommentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
        incrementRefreshKey: (state) => {
            state.refreshKey += 1;
        },
		setCommentsStart: (state) => {
			state.loading = true;
		},
		setCommentsSuccess: (state, action) => {
			state.comments = action.payload;
			state.loading = false;
			state.error = false;
		},
		setCommentsFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		addCommentStart: (state) => {
			state.loading = true;
		},

		addCommentSuccess: (state, action) => {
			state.comments.push(action.payload);
			state.loading = false;
			state.error = false;
		},
		addCommentFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		removeCommentStart: (state) => {
			state.loading = true;
		},
        
		removeCommentSuccess: (state, action) => {
            state.loading = false;
			state.error = false;
			state.comments = state.comments.filter((comment) => comment._id !== action.payload);
            //return state.filter(comment => comment._id !== action.payload);
		},
		removeCommentFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		clear: (state) => {
			state.comments = [];
			state.loading = false;
			state.error = false;
		},
	},
});

export const {
    incrementRefreshKey,
	setCommentsStart,
	setCommentsSuccess,
	setCommentsFailure,
	addCommentStart,
	addCommentSuccess,
	addCommentFailure,
	removeCommentStart,
	removeCommentSuccess,
	removeCommentFailure,
	clear,
} = CommentSlice.actions;

export default CommentSlice.reducer;
