const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export const services = async (searchData) => {
	const api =
		'http://localhost:3001/services?' +
		new URLSearchParams({
			categoria: searchData.categoria,
			tipoMascota: searchData.tipoMascota,
			frecuencia: searchData.frecuencia,
			zona: searchData.zona,
			calificacion: searchData.calificacion,
			page: searchData.page,
		});

	const res = await fetch(api, {
		method: 'GET',
		credentials: 'include',
		headers,
	});
	const data = await res.json();
	return data;
};

export const getService = async (id) => {
	const res = await fetch(`http://localhost:3001/services/${id}`, {
		method: 'GET',
		credentials: 'include',
		headers,
	});
	const data = await res.json();
	return data;
};

export const createService = async (formData) => {
	const res = await fetch('http://localhost:3001/services', {
		method: 'POST',
		credentials: 'include',
		headers,
		body: JSON.stringify(formData),
	});
	const data = await res.json();
	return data;
};

export const getPetSitterServices = async (id) => {
	const res = await fetch(`http://localhost:3001/${id}/services`, {
		method: 'GET',
		credentials: 'include',
		headers,
	});
	const data = await res.json();
	return data;
};

export const updateService = async (id, formData) => {
	const res = await fetch(`http://localhost:3001/services/${id}`, {
		method: 'PUT',
		credentials: 'include',
		headers,
		body: JSON.stringify(formData),
	});
	const data = await res.json();
	return data;
};

export const deleteService = async (id) => {
	const res = await fetch(`http://localhost:3001/services/${id}/delete`, {
		method: 'PUT',
		credentials: 'include',
		headers,
        body: JSON.stringify({status: 0}),
	});
	const data = await res.json();
	return data;
};
