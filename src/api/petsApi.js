const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export const getPets = async () => {
	const res = await fetch('http://localhost:3001/pets', {
		method: 'GET',
		credentials: 'include',
		headers,
	});
	const data = await res.json();
	return data;
};

export const createPet = async (pet) => {
	const res = await fetch('http://localhost:3001/pets', {
		method: 'POST',
		credentials: 'include',
		headers,
		body: JSON.stringify(pet),
	});
	const data = await res.json();
	return data;
};


export const deletePet = async (id) => {
    const res = await fetch(`http://localhost:3001/pets/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers,
    });
    const data = await res.json();

    return data;
}

export const addPet = async (pet) => {
    const res = await fetch('http://localhost:3001/pets', {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify(pet),
    });
    const data = await res.json();
    return data;
}