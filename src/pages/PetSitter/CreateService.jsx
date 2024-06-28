import './CreateService.css';

import { useState } from 'react';

import { createService } from '../../api/serviceApi';

import { categoria, frecuencia, tipoMascota, estado } from '../../api/configs';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const CreateService = () => {
	let [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		categoria: categoria[0],
		frecuencia: frecuencia[0],
		tipoMascota: tipoMascota[0],
		estado: estado[0],
	});

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleErrors = (value, name) => {
		let error = '';

		if (value.length === 0) {
			return (error = 'Este campo es requerido');
		}

		if (name === 'nombre') {
			if (value.length < 3) return (error = 'El nombre debe tener al menos 3 caracteres');
			if (value.length > 30) return (error = 'El nombre no puede tener más de 30 caracteres');
		}

		if (name === 'costoHR') {
			if (!/^\d+$/.test(value)) {
				return (error = 'El costo por hora debe ser un número');
			} else if (isNaN(parseInt(value))) {
				return (error = 'El costo por hora debe ser un número');
			} else if (value <= 0) {
				return (error = 'El costo por debe ser mayor a 0');
			}
		}

		if (name === 'descripcion' && value.length < 10) {
			return (error = 'La descripción debe tener al menos 10 caracteres');
		}

		return error;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		const error = handleErrors(value, name);

		if (error) {
			setFormData({ ...formData, [name]: '' });
			setErrors({ ...errors, [name]: error });
			return;
		}

		delete errors[name];

		if (name === 'costoHR') {
			setFormData({ ...formData, costoHR: parseInt(value) });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

    

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length > 0) return;

		setLoading(true);

		const res = await createService(formData);
   
		if (res.errors) {
			const errorObject = res.errors.reduce((obj, error) => {
				obj[error.field] = error.error;
				return obj;
			}, {});
			setErrors(errorObject);
			setLoading(false);
			return;
		}


		setLoading(false);
		Swal.fire({
			icon: 'success',
			title: 'El servicio ha sido creado exitosamente',
			showConfirmButton: false,
			timer: 1500,
		});

		navigate('/my-services');
	};

	return (
		<main className='m-[10%] flex flex-col items-center justify-center lg:m-[4%] lg:px-[15%]'>
			<h1 className='mb-16 text-center text-[7vw] text-[#00A89C] sm:text-[3rem]'>
				Crea un nuevo servicio
			</h1>
			<form onSubmit={handleSubmit} className='flex w-[65%] flex-col'>
				<div className='mb-[15px] flex flex-col'>
					<label htmlFor='name' className='mb-[10px]'>
						Nombre del servicio:
					</label>
					<input
						type='text'
						id='name'
						name='nombre'
						required
						onChange={handleChange}
						className={`${errors.nombre ? 'border-rose-500' : ''} mb-[10px] rounded-md border px-[10px] py-[5px]`}
					/>
					<p className={`text-[#ff0000] ${errors.nombre ? 'block' : 'hidden'}`}>
						{errors.nombre}
					</p>
				</div>

				<div className='mb-[15px] flex flex-col'>
					<label htmlFor='categoria' className='mb-[10px]'>
						Categoria:
					</label>
					<select
						name='categoria'
						id='categoria'
						required
						onChange={handleChange}
						className={`${errors.categoria ? 'border-rose-500' : ''} mb-[10px] cursor-pointer appearance-none rounded-md border bg-white px-[10px] py-[5px]`}
					>
						{categoria.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>

					<p className={`text-[#ff0000] ${errors.categoria ? 'block' : 'hidden'}`}>
						{errors.categoria}
					</p>
				</div>
				<div className='mb-[15px] flex flex-col'>
					<label htmlFor='frecuencia' className='mb-[10px]'>
						Frecuencia:
					</label>
					<select
						name='frecuencia'
						id='frecuencia'
						required
						onChange={handleChange}
						className={`${errors.frecuencia ? 'border-rose-500' : ''} mb-[10px] cursor-pointer appearance-none rounded-md border bg-white px-[10px] py-[5px]`}
					>
						{frecuencia.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>

					<p className={`text-[#ff0000] ${errors.frecuencia ? 'block' : 'hidden'}`}>
						{errors.frecuencia}
					</p>
				</div>

				<div className='mb-[15px] flex flex-col'>
					<label htmlFor='tipoMascota' className='mb-[10px]'>
						Tipo de mascota:
					</label>
					<select
						name='tipoMascota'
						id='tipoMascota'
						required
						onChange={handleChange}
						className={`${errors.tipoMascota ? 'border-rose-500' : ''} mb-[10px] cursor-pointer appearance-none rounded-md border bg-white px-[10px] py-[5px]`}
					>
						{tipoMascota.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>

					<p className={`text-[#ff0000] ${errors.tipoMascota ? 'block' : 'hidden'}`}>
						{errors.tipoMascota}
					</p>
				</div>

				<div className='mb-[15px] flex flex-col'>
					<label htmlFor='costoHR' className='mb-[10px]'>
						Costo/hr:
					</label>
					<input
						type='string'
						id='costoHR'
						name='costoHR'
						required
						onChange={handleChange}
						step='0.01'
						min='1'
						className={`${errors.costoHR ? 'border-rose-500' : ''} mb-[10px] appearance-none rounded-md border px-[10px] py-[5px]`}
					/>
					<p className={`text-[#ff0000] ${errors.costoHR ? 'block' : 'hidden'}`}>
						{errors.costoHR}
					</p>
				</div>

				<div className='mb-[15px] flex flex-col'>
					<label htmlFor='estado' className='mb-[10px]'>
						Estado:
					</label>
					<select
						name='estado'
						id='estado'
						required
						onChange={handleChange}
						className={`${errors.estado ? 'border-rose-500' : ''} mb-[10px] cursor-pointer appearance-none rounded-md border bg-white px-[10px] py-[5px]`}
					>
						{estado.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>

					<p className={`text-[#ff0000] ${errors.estado ? 'block' : 'hidden'}`}>
						{errors.estado}
					</p>
				</div>

				<div className='mb-[15px] flex flex-col'>
					<label htmlFor='descripcion' className='mb-[10px]'>
						Descripcion del servicio:
					</label>
					<textarea
						id='descripcion'
						name='descripcion'
						onChange={handleChange}
						className={`${errors.descripcion ? 'border-rose-500' : ''} mb-[10px] resize-none rounded-md border px-[10px] py-[5px]`}
					></textarea>
					<p className={`text-[#ff0000] ${errors.descripcion ? 'block' : 'hidden'}`}>
						{errors.descripcion}
					</p>
				</div>

				<button
					disabled={loading}
					className={`mt-[20px] block w-[100%] self-center rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center text-white md:w-[50%] lg:self-start xl:w-[35%]`}
				>
					Crear servicio
				</button>
			</form>
		</main>
	);
};
