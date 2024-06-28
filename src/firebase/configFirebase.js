import { initializeApp } from 'firebase/app';

import { getAnalytics } from 'firebase/analytics';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAX593Ihs0FHC8A5dsG898iAxG-LcAZqLk',

	authDomain: 'tpoapi-fe3ee.firebaseapp.com',

	projectId: 'tpoapi-fe3ee',

	storageBucket: 'tpoapi-fe3ee.appspot.com',

	messagingSenderId: '677209870382',

	appId: '1:677209870382:web:8c2ef41072dcf637c68fbf',

	measurementId: 'G-34BCYLG5TM',
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFile(file, name) {
	const storageRef = ref(storage, name);
	await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url
}
