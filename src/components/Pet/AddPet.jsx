import { tipoMascota } from '../../api/configs.js';
import Select from 'react-select';

import { useState } from 'react';

import { addPet } from '../../api/petsApi';
import { useDispatch } from 'react-redux';
import { addPetSuccess, addPetFailure, addPetStart } from '../../reducers/pets/petSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const AddPet = () => {
	const options = tipoMascota.map((cat, index) => ({ value: index, label: cat }));

	const [formData, setFormData] = useState({});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	let [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleErrors = (value, name) => {
		let error = '';

		if (value.length === 0) {
			return (error = 'Debes completar este campo');
		}

		if (name === 'nombre') {
			if (value.length < 2) return (error = 'El nombre debe tener al menos 2 caracteres');
			if (value.length > 15) return (error = 'El nombre debe tener menos de 15 caracteres');
		}

		return error;
	};

	const handleChange = (e) => {
		const value = e.target ? e.target.value : e.value;
        const name = e.target ? e.target.name : 'tipoMascota';

		const error = handleErrors(value, name);

		if (error) {
			setFormData({ ...formData, [name]: e.value });
			setErrors({ ...errors, [name]: error });
			return;
		}

		delete errors[name];

        

		if (e.target)
			setFormData({
				...formData,
				[name]: value,
			});
		else
			setFormData({
				...formData,
				tipoMascota: e.value,
			});
	};


	const handleSubmit = async (e) => {
		e.preventDefault();

		if (Object.keys(errors).length > 0) return;

		try {
			setLoading(true);
			dispatch(addPetStart());
			const res = await addPet(formData);

			if (res.errors) {
				const errorObject = res.errors.reduce((obj, error) => {
					obj[error.field] = error.error;
					return obj;
				}, {});

				setLoading(false);
				setErrors(errorObject);
				dispatch(addPetFailure(res.error.message));
				return;
			}

			if (res.success === false) {
				setLoading(false);
				dispatch(addPetFailure(res.error.message));
				const key = res.error.key;
				setErrors({ [key]: res.error.message, ...errors });
				return;
			}

			setLoading(false);

			Swal.fire({
				icon: 'success',
				title: 'Mascota agregada con exito',
				showConfirmButton: false,
				timer: 1500,
			});

			dispatch(addPetSuccess(res));
			navigate(-1);
		} catch (error) {
			dispatch(addPetFailure(error));
		}
	};

	return (
		<section className='flex w-fit flex-col items-start justify-center lg:w-[100%] lg:items-start'>
			<p className='self-start text-[4vw] font-bold md:text-[20px]'>Nuevas mascotas:</p>
			<form
				onSubmit={handleSubmit}
				className='flex w-[100%] flex-col items-center justify-center'
			>
				<section className='mt-[25px] flex w-[100%] justify-between rounded-[10px] border p-[20px] xl:w-[50%]'>
					<div className='flex w-[45%] flex-col'>
						<label htmlFor='nombre'>Tipo de mascota:</label>
						<Select
							isSearchable
							className={`${errors.tipoMascota ? 'border border-rose-500' : ''} block h-[30px]`}
							name='tipoMascota'
							options={options}
							onChange={handleChange}
							styles={{
								control: (base) => ({
									...base,

									boxShadow: 'none',
									margin: 0,
									padding: 0,
									minHeight: 'initial',
									justifyContent: 'center',

									fontSize: '20px', // Cambia esto por el tamaño que quieras
								}),
								menu: (base) => ({
									...base,

									boxShadow: 'none',
									margin: 0,
									padding: 0,

									fontSize: '20px', // Cambia esto por el tamaño que quieras
								}),
								dropdownIndicator: () => ({
									display: 'none',
								}),
								indicatorSeparator: () => ({
									display: 'none',
								}),
								singleValue: (base) => ({
									...base,
									margin: 0,
									padding: 0,

									fontSize: '20px', // Cambia esto por el tamaño que quieras
								}),
							}}
						/>
						<p
							className={`mt-4 text-[#ff0000] ${errors.tipoMascota ? 'block' : 'hidden'}`}
						>
							{errors.tipoMascota}
						</p>
					</div>
					<div className='flex w-[45%] flex-col'>
						<label htmlFor='nombre'>Nombre:</label>
						<input
							onChange={handleChange}
							className={`${errors.nombre ? 'border-rose-500' : ''} h-[44px] rounded-[5px] border border-[#cccccc] pl-[10px]`}
							name='nombre'
						/>
						<p className={`text-[#ff0000] ${errors.nombre ? 'block' : 'hidden'}`}>
							{errors.nombre}
						</p>
					</div>
				</section>
				<button
					disabled={loading}
					className='mt-[20px] block w-fit rounded-[10px] bg-[#7900cc] px-[10px] py-[5px] text-center text-white lg:self-start'
				>
					Aplicar cambios
				</button>
			</form>
		</section>
	);
};
