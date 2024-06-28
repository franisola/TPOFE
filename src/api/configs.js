export const tipoMascota = [
	'Perro',
	'Gato',
	'Conejo',
	'Hamster',
	'Pez',
	'Huron',
	'Cobayo',
	'Pajaro',
	'Tortuga',
];


export const transformDate = (fecha) => {
    if (!fecha) return '';
    const fechaObtenida = new Date(fecha);
    const dia = ("0" + fechaObtenida.getDate()).slice(-2);
    const mes = ("0" + (fechaObtenida.getMonth() + 1)).slice(-2);
    const año = fechaObtenida.getFullYear().toString().slice(-2);
    const fechaLegible = `${dia}-${mes}-${año}`;
    return fechaLegible;
}


export const categoria = ['Cuidado de mascotas', 'Adiestramiento', 'Paseos'];
export const frecuencia = ['Unica', 'Diario', 'Semanal', 'Mensual'];
export const calificacion = ['1', '2', '3', '4', '5'];
export const estado = ['Publicado', 'No Publicado'];
export const contractState = ['Solicitado', 'Aceptado', 'Rechazado', 'Finalizado'];

export const barriosCABA = [
    "Agronomía",
    "Almagro",
    "Balvanera",
    "Barracas",
    "Belgrano",
    "Boedo",
    "Caballito",
    "Chacarita",
    "Coghlan",
    "Colegiales",
    "Constitución",
    "Flores",
    "Floresta",
    "La Boca",
    "La Paternal",
    "Liniers",
    "Mataderos",
    "Monte Castro",
    "Montserrat",
    "Nueva Pompeya",
    "Núñez",
    "Palermo",
    "Parque Avellaneda",
    "Parque Chacabuco",
    "Parque Chas",
    "Parque Patricios",
    "Puerto Madero",
    "Recoleta",
    "Retiro",
    "Saavedra",
    "San Cristóbal",
    "San Nicolás",
    "San Telmo",
    "Vélez Sarsfield",
    "Versalles",
    "Villa Crespo",
    "Villa Devoto",
    "Villa General Mitre",
    "Villa Lugano",
    "Villa Luro",
    "Villa Ortúzar",
    "Villa Pueyrredón",
    "Villa Real",
    "Villa Riachuelo",
    "Villa Santa Rita",
    "Villa Soldati",
    "Villa Urquiza",
    "Villa del Parque"
  ];

export const isWorking = async () => {
    const res = await fetch('http://localhost:3001/is-working');
    const data = await res.json();
    return data;
}