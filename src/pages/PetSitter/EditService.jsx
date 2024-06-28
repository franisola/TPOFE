import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { getService, updateService, deleteService } from '../../api/serviceApi';

import { categoria, frecuencia, tipoMascota, estado } from '../../api/configs';

export const EditService = () => {
	const { id } = useParams();

	const [service, setService] = useState({});
	const [formData, setFormData] = useState({});
	let [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const data = getService(id);
		data.then((data) => {
			if (data.success === false || data.error) {
				errors.error = data.error;
				return;
			}
			setService(data.service);
			setFormData({
				nombre: data.service.nombre,
				costoHR: data.service.costoHR,
				descripcion: data.service.descripcion,
				categoria: data.service.categoria,
				frecuencia: data.service.frecuencia,
				tipoMascota: data.service.tipoMascota,
				estado: data.service.estado,
			});
		}).catch((err) => {
			errors.error = err;
		});
	}, [id, errors.error]);

	const handleErrors = (value, name) => {
		let error = '';

		if (value.length === 0) {
			return (error = 'Este campo es requerido');
		}

		if (name === 'nombre') {
			if (value.length < 3) return (error =  'El nombre debe tener al menos 3 caracteres');
			if (value.length > 30) return (error = 'El nombre debe tener menos de 30 caracteres');
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

		if (name === 'descripcion') {
			if (value.length < 10) {
				return (error = 'La descripción debe tener al menos 10 caracteres');
			}
			if (value.length > 50) {
				return (error = 'La descripción debe tener menos de 50 caracteres');
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

		setErrors((prevErrors) => {
			const newErrors = { ...prevErrors };
			delete newErrors[name];
			return newErrors;
		});

		if (name === 'costoHR') {
			setFormData({ ...formData, costoHR: parseInt(value) });
		} else {
			setFormData({ ...formData, [name]: value });
		}
	};

	function sonValoresIguales(formData, serviceData) {
		for (const key in formData) {
			if (formData[key] !== serviceData[key]) {
				return false;
			}
		}
		return true;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length > 0) return;
		if (sonValoresIguales(formData, service)) return;

		const res = await updateService(id, formData);

		if (res.errors) {
			const errorObject = res.errors.reduce((obj, error) => {
				obj[error.field] = error.error;
				return obj;
			}, {});
			setErrors(errorObject);
			return;
		}

		if (res.success === false) {
			setLoading(false);
			const key = res.error.key;
			setErrors({ [key]: res.error.message, ...errors });
			return;
		}

		Swal.fire({
			icon: 'success',
			title: 'El servicio ha sido actualizado exitosamente',
			showConfirmButton: false,
			timer: 1500,
		});

		navigate('/my-services');
	};

	const handleDelete = async () => {
		const html = `<p style="color: #ff0000;">Estas seguro que deseas eliminar este servicio?</p>`;
		const isDeleted = await Swal.fire({
			html,
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar',
			showCancelButton: true,
			customClass: {
				confirmButton: 'swal2-confirm',
				cancelButton: 'swal2-cancel',
			},
		});

		if (isDeleted.isConfirmed) {
			const res = await deleteService(id);
			if (res.success) {
				Swal.fire({
					icon: 'success',
					title: 'El servicio ha sido eliminado exitosamente',
					showConfirmButton: false,
					timer: 1500,
				});
				navigate('/my-services');
			} else {
				Swal.fire({
					icon: 'error',
					title: 'Ha ocurrido un error al intentar eliminar el servicio',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		}
	};

	if (Object.keys(service).length == 0) {
		return <h1 className='self-center mt-24'>Cargando..</h1>;
	}

	return (
		<main className='m-[10%] flex flex-col items-center justify-center lg:m-[4%] lg:px-[15%]'>
			<h1 className='mb-16 text-center text-[7vw] text-[#00A89C] sm:text-[3rem]'>
				Editar servicio
			</h1>
			<form onSubmit={handleSubmit} className='flex w-[100%] flex-col items-center'>
				<div className='flex w-[100%]  md:w-[75%] flex-col items-center'>
					<div className='mb-[15px] flex flex-col  md:flex-row w-[100%] flex-wrap md:items-center md:justify-between'>
						<label htmlFor='nombre' className=' md:w-[20%] font-bold'>
							Nombre:
						</label>
						<input
							type='text'
							id='nombre'
							name='nombre'
							required
							value={formData.nombre}
							onChange={handleChange}
							className={`flex-grow border-b-[1px] px-[10px] py-[5px] focus:outline-none`}
						/>
						<p
							className={`w-[100%] text-[#ff0000] ${errors.nombre ? 'block' : 'hidden'}`}
						>
							{errors.nombre}
						</p>
					</div>

					<div className='mb-[15px] flex flex-col  md:flex-row w-[100%] flex-wrap md:items-center md:justify-between'>
						<label htmlFor='categoria' className=' md:w-[20%] font-bold'>
							Categoria:
						</label>

						<select
							name='categoria'
							id='categoria'
							required
							value={formData.categoria}
							onChange={handleChange}
							className={`flex-grow cursor-pointer appearance-none border-b-[1px] bg-white px-[10px] py-[5px] focus:outline-none`}
						>
							{categoria.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
						<p
							className={`w-[100%] text-[#ff0000] ${errors.categoria ? 'block' : 'hidden'}`}
						>
							{errors.categoria}
						</p>
					</div>
					<div className='mb-[15px] flex flex-col  md:flex-row w-[100%] flex-wrap md:items-center md:justify-between'>
						<label htmlFor='frecuencia' className=' md:w-[20%] font-bold'>
							Frecuencia:
						</label>
						<select
							name='frecuencia'
							id='frecuencia'
							required
							onChange={handleChange}
							value={formData.frecuencia}
							className={`flex-grow cursor-pointer appearance-none border-b-[1px] bg-white px-[10px] py-[5px] focus:outline-none`}
						>
							{frecuencia.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
						<p
							className={`w-[100%] text-[#ff0000] ${errors.frecuencia ? 'block' : 'hidden'}`}
						>
							{errors.frecuencia}
						</p>
					</div>
					<div className='mb-[15px] flex flex-col  md:flex-row w-[100%] flex-wrap md:items-center md:justify-between'>
						<label htmlFor='tipoMascota' className=' md:w-[20%] font-bold'>
							Tipo de mascota:
						</label>
						<select
							name='tipoMascota'
							id='tipoMascota'
							required
							onChange={handleChange}
							value={formData.tipoMascota}
							className={`flex-grow cursor-pointer appearance-none border-b-[1px] bg-white px-[10px] py-[5px] focus:outline-none`}
						>
							{tipoMascota.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
						<p
							className={`w-[100%] text-[#ff0000] ${errors.tipoMascota ? 'block' : 'hidden'}`}
						>
							{errors.tipoMascota}
						</p>
					</div>
					<div className='mb-[15px] flex flex-col  md:flex-row w-[100%] flex-wrap md:items-center md:justify-between'>
						<label htmlFor='costoHR' className=' md:w-[20%] font-bold'>
							Costo/hr:
						</label>
						<input
							type='text'
							id='costoHR'
							name='costoHR'
							required
							onChange={handleChange}
							value={formData.costoHR}
							className={`flex-grow border-b-[1px] px-[10px] py-[5px] focus:outline-none`}
						/>
						<p
							className={`w-[100%] text-[#ff0000] ${errors.costoHR ? 'block' : 'hidden'}`}
						>
							{errors.costoHR}
						</p>
					</div>
					<div className='mb-[15px] flex flex-col  md:flex-row w-[100%] flex-wrap md:items-center md:justify-between'>
						<label htmlFor='estado' className=' md:w-[20%] font-bold'>
							Estado:
						</label>
						<select
							name='estado'
							id='estado'
							required
							onChange={handleChange}
							value={formData.estado}
							className={`flex-grow cursor-pointer appearance-none border-b-[1px] bg-white px-[10px] py-[5px] focus:outline-none`}
						>
							{estado.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
						<p
							className={`w-[100%] text-[#ff0000] ${errors.estado ? 'block' : 'hidden'}`}
						>
							{errors.estado}
						</p>
					</div>
					<div className='mb-[15px] flex flex-col  md:flex-row w-[100%] flex-wrap md:items-center md:justify-between'>
						<label htmlFor='descripcion' className=' md:w-[20%] font-bold'>
							Descripcion:
						</label>
						<input
							type='text'
							id='descripcion'
							name='descripcion'
							required
							onChange={handleChange}
							value={formData.descripcion}
							className={`flex-grow border-b-[1px] px-[10px] py-[5px] focus:outline-none`}
						/>
						<p
							className={`w-[100%] text-[#ff0000] ${errors.descripcion ? 'block' : 'hidden'}`}
						>
							{errors.descripcion}
						</p>
					</div>
					<div className='mt-8 flex w-[100%] xl:w-[50%] justify-between self-start'>
						<button
							type='submit'
							className='w-[45%] rounded-[10px] bg-[#7900cc] py-[5px] font-bold text-white'
						>
							Aplicar cambios
						</button>
						<button
							type='button'
							disabled={loading}
							onClick={handleDelete}
							className='w-[45%] rounded-[10px] bg-[#B92100] py-[5px] font-bold text-white'
						>
							Eliminar servicio
						</button>
					</div>
				</div>
			</form>
		</main>
	);
};
