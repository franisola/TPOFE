import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Select from 'react-select';

import { transformDate } from '../../api/configs.js';

import { getContract } from '../../api/contractApi.js';
import { editContract } from '../../api/contractApi.js';
import { contractState } from '../../api/configs.js';

export const ContractInfo = () => {
	const { id } = useParams();

	const [contract, setContract] = useState({});
	const [client, setClient] = useState({});
	const [service, setService] = useState({});
	const [formData, setFormData] = useState({});
	const [push, setPush] = useState(true);

	const disabledStates = ['Rechazado', 'Finalizado'];

	const options = contractState.map((cat, index) => {
		if (index === 0 || disabledStates.includes(contract.estado)) {
			return { value: index, label: cat, isDisabled: true };
		}
		return { value: index, label: cat };
	});

	const navigate = useNavigate();

	useEffect(() => {
		getContract(id)
			.then((data) => {
				if (data.success === false || data.error) {
					return data.error;
				}
				setContract(data);
				setClient(data.user);
				setFormData({ estado: data.estado });
				setService(data.service);
			})
			.catch((error) => {
				return error;
			});
	}, [id]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			estado: e.label,
		});
		if (contract.estado === formData.estado) {
			setPush(false);
		} else {
			setPush(true);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = await editContract(id, formData);
			if (data.success === false || data.error) {
				return data.error;
			}
			navigate('/');
		} catch (error) {
			return error;
		}
	};

	if (
		Object.keys(client).length === 0 ||
		Object.keys(service).length === 0 ||
		Object.keys(contract).length === 0
	)
		return <h1 className='self-center mt-24'>Cargando...</h1>;

	return (
		<main className='m-[10%] flex flex-col items-center justify-center lg:m-[4%] lg:px-[15%]'>
			<h1 className='mb-16 text-center text-[7vw] text-[#00A89C] sm:text-[3rem]'>
				Informacion
			</h1>
			<section className='flex w-[100%] flex-col items-center space-y-[15px] lg:w-[50%]'>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Nombre:</p>
					<p>{service.nombre}</p>
				</div>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Categoria:</p>
					<p>{service.categoria}</p>
				</div>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Frecuencia:</p>
					<p>{service.frecuencia}</p>
				</div>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Tipo de mascota:</p>
					<p>{service.tipoMascota}</p>
				</div>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Zona:</p>
					<p>{service.zona}</p>
				</div>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Costo/hr:</p>
					<p>{service.costoHR}</p>
				</div>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Fecha de inicio:</p>
					<p>{transformDate(contract.fechaInicio)}</p>
				</div>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Fecha de fin:</p>
					<p>{transformDate(contract.fechaFin)}</p>
				</div>
			</section>

			<h2 className='my-16 text-center text-[7vw] text-[#00A89C] sm:text-[3rem]'>
				Informacion del cliente
			</h2>

			<section className='flex w-[100%] flex-col items-center space-y-[15px] lg:w-[50%]'>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Nombre:</p>
					<p>{client.nombre + ' ' + client.apellido}</p>
				</div>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Telefono:</p>
					<p>{client.telefono.slice(3)}</p>
				</div>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Email:</p>
					<p>{client.email}</p>
				</div>
				<div className='flex w-[75%] justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='w-[55%] font-bold'>Horario de referencia:</p>
					<p>{contract.horarioReferencia}</p>
				</div>
				<div className='flex w-[75%] flex-col justify-between sm:w-[50%] lg:w-[100%] lg:justify-normal'>
					<p className='mb-4 w-[55%] font-bold'>Motivo del servicio:</p>
					<div className='h-fit w-[100%] border px-[15px] py-[10px] shadow-[1px_4px_4px_rgba(0,0,0,0.15)] sm:w-[250px]'>
						<p className='break-words'>{contract.motivoDelServicio}</p>
					</div>
				</div>
			</section>

			<form onSubmit={handleSubmit} className='mt-8 w-[50%]'>
				<h3 className='mb-4 self-center text-center text-[7vw] text-[#00A89C] sm:self-start sm:text-start sm:text-[2rem]'>
					Cambiar estado
				</h3>

				<Select
					placeholder=''
					name='estado'
					options={options}
					onChange={handleChange}
					value={options[contractState.indexOf(formData.estado)]}
				/>

				<button
					disabled={push}
					className={`${disabledStates.includes(contract.estado) ? 'hidden' : ''} mt-[20px] block w-[100%] self-center rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center text-white md:w-[50%] lg:self-start xl:w-[35%]`}
				>
					Aplicar cambios
				</button>
			</form>
		</main>
	);
};
