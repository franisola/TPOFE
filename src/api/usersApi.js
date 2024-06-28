// const API_URL = "'http://localhost:3001'";

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export const login = async (user) => {
	const res = await fetch('http://localhost:3001/login', {
		method: 'POST',
		credentials: 'include',
		headers,
		body: JSON.stringify(user),
	});
	const data = await res.json();
	return data;
};

export const register = async (user) => {
	const res = await fetch('http://localhost:3001/register', {
		method: 'POST',
		credentials: 'include',
		headers,
		body: JSON.stringify(user),
	});
	const data = await res.json();
	return data;
};

export const verifyData = async (user) => {
	const res = await fetch('http://localhost:3001/verify-data', {
		method: 'POST',
		credentials: 'include',
		headers,
		body: JSON.stringify(user),
	});
	const data = await res.json();
	return data;
};

export const changePassword = async (user) => {
	const res = await fetch('http://localhost:3001/change-password', {
		method: 'POST',
		credentials: 'include',
		headers,
		body: JSON.stringify(user),
	});
	const data = await res.json();
	return data;
};

export const getUser = async (id) => {
	const api = `http://localhost:3001/profile/${id}`;
	const res = await fetch(api, {
		method: 'GET',
		credentials: 'include',
		headers,
	});
	const data = await res.json();
	return data;
}

export const getUserFeedback = async (id) => {

    const res = await fetch(`http://localhost:3001/${id}/feedback`, {
        method: 'GET',
        credentials: 'include',
        headers,
    });
    const data = await res.json();
    return data;
}

export const editUser = async (user) => {
    const res = await fetch(`http://localhost:3001/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers,
        body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;

}