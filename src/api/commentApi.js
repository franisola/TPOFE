const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export const getComments = async (idService) => {
	const res = await fetch(`http://localhost:3001/services/${idService}/comments`, {
		method: 'GET',
		credentials: 'include',
		headers,
	});
	const data = await res.json();

	return data;
};

export const createComment = async (idService, data) => {
	const res = await fetch(`http://localhost:3001/services/${idService}/comments`, {
		method: 'POST',
		credentials: 'include',
		headers,
		body: JSON.stringify(data),
	});
	const resData = await res.json();
	return resData;
};

export const getPetSitterComments = async () => {
    const res = await fetch('http://localhost:3001/pet-sitter-comments', {
        method: 'GET',
        credentials: 'include',
        headers,
    });
    const data = await res.json();
    return data;
}


export const deleteComment = async (id) => {
    const res = await fetch(`http://localhost:3001/comments/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers,
    });
    const data = await res.json();
    return data;
}