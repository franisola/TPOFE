const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
};

export const contract = async (idService, body) => {
    const res = await fetch(`http://localhost:3001/${idService}/contracts`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
}
	
export const getContracts = async () => {
    const res = await fetch(`http://localhost:3001/contracts`, {
        method: 'GET',
        credentials: 'include',
        headers,
    });
    const data = await res.json();
    return data;
}


export const getContract = async (id) => {
    const res = await fetch(`http://localhost:3001/contracts/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers,
    });
    const data = await res.json();
    return data;
}

export const editContract = async (id, body) => {
    const res = await fetch(`http://localhost:3001/contracts/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers,
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
}