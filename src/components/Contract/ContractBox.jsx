import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { transformDate } from '../../api/configs';

export const ContractBox = (props) => {
	const { contract } = props;
	const { service } = contract;
	const { user } = contract;

	const color = () => {
		if (contract.estado === 'Solicitado') return 'bg-[#00A89C]';
		if (contract.estado === 'Aceptado') return 'bg-[#00A84D]';
		if (contract.estado === 'Rechazado') return 'bg-[#B92100]';
		if (contract.estado === 'Finalizado') return 'bg-[#1800A8]';
		return '';
	};

    

	return (
		<div className='mb-8 w-[100%] flex sm:w-[45%] xl:w-[40%] flex-row justify-between rounded-[10px] border px-[15px] py-[10px]'>
			<div className='mb-[15px] flex w-fit flex-col space-y-[5px] md:mb-[0] items-start'>
				<p>{user.nombre}</p>
				<p>{service.nombre}</p>
				<p>{service.frecuencia}</p>
				<p>{service.tipoMascota}</p>
				<p>{service.costoHR}</p>
				<p>{transformDate(contract.fechaInicio)}</p>
				<p>{transformDate(contract.fechaFin)}</p>
			</div>
			<div className={`flex w-fit flex-col items-center justify-center space-y-[5px]`}>
				<p>Estado</p>
				<div className={`${color()} rounded-[10px] px-[20px] py-[2.5px]`}>
					<p className='font-medium text-white'>{contract.estado}</p>
				</div>
				<Link
					className='block text-[#7900cc] hover:text-[#61069c]'
					to={`/contract/${contract._id}`}
				>
					Ver contrato
				</Link>
			</div>
		</div>
	);
};

ContractBox.propTypes = {
	contract: PropTypes.object.isRequired,
};

export default ContractBox;
