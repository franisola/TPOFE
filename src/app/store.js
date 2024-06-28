import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//Reducers
import userReducer from '../reducers/user/userSlice';
import petSlice from '../reducers/pets/petSlice';
import commentSlice from '../reducers/comments/commentSlice';
import contractSlice from '../reducers/contracts/contractSlice';
import serviceSlice from '../reducers/services/serviceSlice';

const rootReducer = combineReducers({
	user: userReducer,
	pets: petSlice,
	comments: commentSlice,
    contracts: contractSlice,
    services: serviceSlice,
});

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
