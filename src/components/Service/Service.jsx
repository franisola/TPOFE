import PropTypes from 'prop-types';

import { Links } from '../Links/Links';

export const Service = (props) => {
	const { service } = props;
	const { user } = service;




	return (
		<section className='mb-[50px] grid w-[100%] grid-cols-1 gap-y-[10px] xl:w-[45%]'>
			<div className='flex justify-between'>
				<img src={user?.foto} alt={service.nombre} className='w-[40%]' />
				<div className='ml-[30px] flex flex-col items-end'>
					<h2 className='font-bold'> {user.nombre + ' ' + user.apellido} </h2>
					<p> {service.categoria} </p>
					<p> {service.nombre} </p>
					<p> {user.descripcion} </p>
				</div>
			</div>

			<p> {service.descripcion} </p>

			<div className=''>
				<div className='flex justify-between'>
					<p className='font-bold'>Categoria:</p>
					<p className=''> {service.categoria} </p>
				</div>
				<div className='flex justify-between'>
					<p className='font-bold'>Frecuencia:</p>
					<p> {service.frecuencia} </p>
				</div>
				<div className='flex justify-between'>
					<p className='font-bold'>Tipo de mascota:</p>
					<p> {service.tipoMascota} </p>
				</div>
				<div className='flex justify-between'>
					<p className='font-bold'>Zona:</p>
					<p> {user.zona} </p>
				</div>
				<div className='flex justify-between'>
					<p className='font-bold'>Costo/hr:</p>
					<p> {'$' + service.costoHR} </p>
				</div>
			</div>

			<Links idService={service._id} idUser={user._id} />
		</section>
	);
};

Service.propTypes = {
	service: PropTypes.object.isRequired,
};
