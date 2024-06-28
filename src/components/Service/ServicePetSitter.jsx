import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export const ServicePetSitter = (props) => {
	const { service } = props;

	return (
		<div className='mb-8 flex flex-col rounded-[10px] border px-[15px] py-[10px] lg:w-[45%] xl:w-[32%]'>
			<div className='flex w-[100%] justify-between'>
				<p className='mb-[5px] w-fit font-bold'>Nombre:</p>
				<p>{service.nombre}</p>
			</div>
			<div className='flex w-[100%] justify-between'>
				<p className='mb-[5px] w-fit font-bold'>Categoria:</p>
				<p>{service.categoria}</p>
			</div>
			<div className='flex w-[100%] justify-between'>
				<p className='mb-[5px] w-fit font-bold'>Frecuencia:</p>
				<p>{service.frecuencia}</p>
			</div>
			<div className='flex w-[100%] justify-between'>
				<p className='mb-[5px] w-fit font-bold'>Tipo de mascota:</p>
				<p>{service.tipoMascota}</p>
			</div>
			<div className='flex w-[100%] justify-between'>
				<p className='mb-[5px] w-fit font-bold'>Zona:</p>
				<p>{service.zona}</p>
			</div>
			<div className='flex w-[100%] justify-between'>
				<p className='mb-[5px] w-fit font-bold'>Costo/hr:</p>
				<p>{service.costoHR}</p>
			</div>
			<div className='flex w-[100%] justify-between'>
				<p className='mb-[5px] w-fit font-bold'>Estado:</p>
				<p>{service.estado}</p>
			</div>

			<Link
				to={`/edit-service/${service._id}`}
				className='mt-4 w-[50%] self-center rounded-[10px] bg-[#7900cc] py-[2px] text-center text-white'
			>
				Editar
			</Link>
		</div>
	);
};

ServicePetSitter.propTypes = {
	service: PropTypes.object.isRequired,
};
