import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getService } from '../../api/serviceApi';
import { useSelector } from 'react-redux';

import { contract } from '../../api/contractApi';

import Swal from 'sweetalert2';

export const Contract = () => {
	const [service, setService] = useState({});
	const [petSitter, setPetSitter] = useState({});
	const { idService } = useParams();

	const [disabledFechaFin, setDisabledFechaFin] = useState(false);

	const { currentUser } = useSelector((state) => state.user);

	const [formData, setFormData] = useState({});

	const [startDate, setStartDate] = useState('');

	let [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 3);
		const formattedDate = tomorrow.toISOString().split('T')[0];
		setStartDate(formattedDate);
		setFormData({ fechaInicio: formattedDate });

		const data = getService(idService);
		data.then((data) => {
			if (data.success === false || data.error) {
				navigate('/error', { state: data.error });
				return;
			}
			setService(data.service);
			setPetSitter(data.service.user);
		}).catch((error) => {
			navigate('/error', { state: error });
			return;
		});
	}, [idService, navigate]);

	const handleErrors = (value, name) => {
		let error = '';

		if (value.length === 0) {
			return (error = 'Debes completar este campo');
		}

		if (name === 'fechaInicio') {
			const fechaInicio = new Date(value);
			const ahora = new Date();
			ahora.setUTCHours(0, 0, 0, 0);
			const tresDiasMas = new Date(
				Date.UTC(ahora.getUTCFullYear(), ahora.getUTCMonth(), ahora.getUTCDate() + 3),
			);
			if (fechaInicio < tresDiasMas) {
				setDisabledFechaFin(true);
				return (error = 'La fecha de inicio debe ser al menos 3 días después de hoy.');
			} else {
				setDisabledFechaFin(false);
			}
		}

		if (name === 'fechaFin') {
			const fechaInicio = new Date(formData.fechaInicio);

			const fechaFin = new Date(value);
			if (fechaFin < fechaInicio) {
				return (error = 'La fecha de fin debe ser igual o posterior a la fecha de inicio.');
			}
		}

		if (name === 'horarioReferencia') {
			if (value.length < 5) {
				return (error = 'El horario de referencia debe tener al menos 5 caracteres');
			}
			if (value.length > 50) {
				return (error = 'El horario de referencia debe tener menos de 50 caracteres');
			}
		}

		if (name === 'motivoDelServicio') {
			if (value.length < 10) {
				return (error = 'El motivo del servicio debe tener al menos 10 caracteres');
			}
			if (value.length > 255) {
				return (error = 'El motivo del servicio debe tener menos de 255 caracteres');
			}
		}
		return error;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		const error = handleErrors(value, name);

		if (error) {
			setFormData({ ...formData, [name]: value });
			setErrors({ ...errors, [name]: error });
			return;
		}

		delete errors[name];

		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length > 0) return;
		try {
			setLoading(true);
			const res = await contract(idService, formData);

			if (res.errors) {
				const errorObject = res.errors.reduce((obj, error) => {
					obj[error.field] = error.error;
					return obj;
				}, {});

				setLoading(false);
				setErrors(errorObject);
				return;
			}

			if (res.success === false) {
				setLoading(false);
				const key = res.error.key;
				setErrors({ [key]: res.error.message, ...errors });
				return;
			}

			setLoading(false);

			Swal.fire({
				icon: 'success',
				title: 'Servicio contratado exitosamente',
				showConfirmButton: false,
				timer: 1500,
			});

			navigate('/dashboard');

			return;
		} catch (error) {
			error.message = 'Error';
		}
	};

	return (
		<main className='m-[10%] flex flex-col items-center justify-center px-[10%] lg:m-[4%] lg:px-[20%]'>
			<h1 className='mb-16 self-center text-center text-[10vw] text-[#00A89C] sm:text-[3rem]'>
				Contratar servicio
			</h1>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col items-start justify-between xl:w-[50%]'
			>
				<div className='my-[10px] flex w-[100%] items-center justify-between'>
					<p className='text-[4vw] font-bold md:text-[20px]'>Responsable: </p>
					<p className='text-[4vw] md:text-[20px]'>
						{petSitter.nombre + ' ' + petSitter.apellido}
					</p>
				</div>
				<div className='my-[10px] flex w-[100%] items-center justify-between'>
					<p className='text-[4vw] font-bold md:text-[20px]'>Nombre: </p>
					<p className='text-[4vw] md:text-[20px]'>{service.nombre}</p>
				</div>
				<div className='my-[10px] flex w-[100%] items-center justify-between'>
					<p className='text-[4vw] font-bold md:text-[20px]'>Categoria: </p>
					<p className='text-[4vw] md:text-[20px]'>{service.categoria}</p>
				</div>
				<div className='my-[10px] flex w-[100%] items-center justify-between'>
					<p className='text-[4vw] font-bold md:text-[20px]'>Frecuencia: </p>
					<p className='text-[4vw] md:text-[20px]'>{service.frecuencia}</p>
				</div>
				<div className='my-[10px] flex w-[100%] items-center justify-between'>
					<p className='text-[4vw] font-bold md:text-[20px]'>Tipo de mascota: </p>
					<p className='text-[4vw] md:text-[20px]'>{service.tipoMascota}</p>
				</div>
				<div className='my-[10px] flex w-[100%] items-center justify-between'>
					<p className='text-[4vw] font-bold md:text-[20px]'>Zona: </p>
					<p className='text-[4vw] md:text-[20px]'>{petSitter.zona}</p>
				</div>
				<div className='my-[10px] flex w-[100%] items-center justify-between'>
					<p className='text-[4vw] font-bold md:text-[20px]'>Costo/hr: </p>
					<p className='text-[4vw] md:text-[20px]'>{'$' + service.costoHR}</p>
				</div>
				<div className='my-[10px] flex w-[100%] items-center justify-between'>
					<p className='text-[4vw] font-bold md:text-[20px]'>Fecha de inicio: </p>
					<input
						type='date'
						min={startDate}
						name='fechaInicio'
						defaultValue={startDate}
						onChange={handleChange}
					/>
				</div>
				<p
					className={`text-[#ff0000] ${errors.fechaInicio ? 'block' : 'hidden'} mb-[20px]`}
				>
					{errors.fechaInicio}
				</p>
				<div className='flex w-[100%] items-center justify-between'>
					<p className='text-[4vw] font-bold md:text-[20px]'>Fecha de fin: </p>
					<input
						type='date'
						disabled={disabledFechaFin}
						min={startDate}
						name='fechaFin'
						onChange={handleChange}
					/>
				</div>
				<p className={`text-[#ff0000] ${errors.fechaFin ? 'block' : 'hidden'} mb-[20px]`}>
					{errors.fechaFin}
				</p>
				<hr className='my-[50px] w-[100%]'></hr>
				<h1 className='mb-16 self-center text-center text-[10vw] text-[#00A89C] sm:text-[3rem]'>
					Informacion de contacto
				</h1>
				<div className='my-[10px] flex w-[100%] items-center justify-between'>
					<p className='text-[4vw] font-bold md:text-[20px]'>Telefono: </p>
					<p className='text-[4vw] md:text-[20px]'>{currentUser.telefono}</p>
				</div>
				<div className='my-[10px] flex w-[100%] items-center justify-between'>
					<p className='text-[4vw] font-bold md:text-[20px]'>Email: </p>
					<p className='text-[4vw] md:text-[20px]'>{currentUser.email}</p>
				</div>
				<div className='my-[10px] flex w-[100%] flex-col items-start justify-start'>
					<label
						htmlFor='horarioReferencia'
						className='text-[4vw] font-bold md:text-[20px]'
					>
						Horario de referencia:{' '}
					</label>

					<input
						onChange={handleChange}
						id='horarioReferencia'
						className={`${errors.horarioReferencia ? 'border border-rose-500' : ''} mt-[5px] w-[100%] rounded-[5px] bg-[#D9D9D9] px-[5px] py-[1px] text-[4vw] md:text-[20px]`}
						name='horarioReferencia'
					/>
					<p
						className={`mt-4 text-[#ff0000] ${errors.horarioReferencia ? 'block' : 'hidden'} mb-[20px]`}
					>
						{errors.horarioReferencia}
					</p>
				</div>
				<div className='my-[10px] flex w-[100%] flex-col items-start justify-start'>
					<label
						htmlFor='motivoDelServicio'
						className='text-[4vw] font-bold md:text-[20px]'
					>
						Motivo de interes del servicio:{' '}
					</label>

					<textarea
						className={`${errors.motivoDelServicio ? 'border border-rose-500' : ''} mt-[5px] h-[200px] w-[100%] rounded-[5px] bg-[#D9D9D9] p-[10px] text-[4vw] md:text-[20px]`}
						id='motivoDelServicio'
						style={{
							paddingTop: '10px',
							boxSizing: 'border-box',
							resize: 'none',
							overflow: 'auto',
						}}
						name='motivoDelServicio'
						onChange={handleChange}
					></textarea>
					<p
						className={`mt-4 text-[#ff0000] ${errors.motivoDelServicio ? 'block' : 'hidden'} mb-[20px]`}
					>
						{errors.motivoDelServicio}
					</p>
				</div>
				<hr className='my-[50px] w-[100%]'></hr>
				<button
					disabled={loading}
					className='block w-[25%] self-center rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center text-white'
				>
					Enviar
				</button>
			</form>
		</main>
	);
};
